import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '@server/iam/utils';
import {
  SignInDto,
  SignUpDto,
  RefreshTokenDto,
  SignInWithTokenDto,
} from '@server/shared/dto';
import { randomUUID } from 'crypto';
import { jwtConfig } from '@server/shared/config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  RefreshTokenIdsStorage,
  RefreshTokenIdsStorageError,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import { UsersService } from '@server/users';
import { CreateUserDto } from '@server/shared/dto';
import { UserEntity } from '@server/shared/entities';
import { TfaAuthenticationService } from './tfa-authentication/tfa-authentication.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hashService: HashingService,
    private readonly userService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly tfaService: TfaAuthenticationService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findOne(
      { email },
      { roles: true, info: true, setting: true },
    );

    if (!user) throw new ConflictException('Email not exists');

    const isMatch = await this.hashService.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('User or password not match');

    if (user.isTfaEnabled) {
      const isValid = this.tfaService.verifyCode(
        signInDto.tfaCode,
        user.tfaSecret,
      );
      if (!isValid) throw new UnauthorizedException('Invalid TFA code');
    }

    const { accessToken, refreshToken } = await this.generateToken(user);

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  async signInWithToken(signInWithToken: SignInWithTokenDto) {
    const { accessToken } = signInWithToken;
    try {
      const { sub } = await this.jwtService.verifyAsync<ActiveUserData>(
        accessToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      const user = await this.userService.findOne(
        { id: sub },
        { info: true, setting: true, roles: true },
      );

      if (!user) throw new UnauthorizedException('User not found');

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    if ((await this.userService.findOne({ email })) !== null)
      throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashService.hash(password);
    const user = new CreateUserDto();

    user.email = email;
    user.password = hashedPassword;

    try {
      await this.userService.create(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }

    return {
      message: 'User created',
    };
  }

  async generateToken(user: UserEntity) {
    const refreshTokenId = randomUUID();

    const payload = {
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };

    const [accessToken, refreshToken] = await Promise.all([
      //* accessToken
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        payload,
      ),
      //* refreshToken
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),

      //* Insert refreshTokenId into storage
      await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshToken.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.userService.findOne({ id: sub }, { roles: true });

      if (!user) throw new UnauthorizedException('User not found');

      const isValid = await this.refreshTokenIdsStorage.validate(
        sub,
        refreshTokenId,
      );

      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return await this.generateToken(user as UserEntity);
    } catch (error: any) {
      if (error instanceof RefreshTokenIdsStorageError) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      throw new UnauthorizedException(error.message ?? 'Invalid refresh token');
    }
  }

  private async signToken<T>(userID: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userID,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
