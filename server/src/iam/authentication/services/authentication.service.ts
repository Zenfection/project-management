import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '../../hashing/hashing.service';
import { SignInDto } from '../dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto/sign-up.dto';
import { randomUUID } from 'crypto';
import jwtConfig from '../../config/jwt.config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import {
  RefreshTokenIdsStorage,
  RefreshTokenIdsStorageError,
} from '../utils/refresh-token-ids.storage/refresh-token-ids.storage';
import { RefreshTokenDto } from '../dto/refresh-token.dto/refresh-token.dto';
import { UsersService } from '../../../users/users.service';
import { CreateUserDto } from '../../../users/dto/create-user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
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

    const user = await this.userService.findOne({ email });

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

    return await this.generateToken(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    if ((await this.userService.findOne({ email })) !== null)
      throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashService.hash(password);
    const user = new CreateUserDto();

    user.email = email;
    user.password = hashedPassword;
    user.name = 'Anonymous';

    try {
      await this.userService.create(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
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

      const user = await this.userService.findOne({ id: sub });

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
    } catch (error) {
      if (error instanceof RefreshTokenIdsStorageError) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      throw new UnauthorizedException(error.message);
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
