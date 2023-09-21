import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '../../hashing/hashing.service';
import { PrismaService } from 'nestjs-prisma';
import { SignInDto } from '../dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto/sign-up.dto';
import { UserEntity } from '../../../users/entities/user.entity';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import jwtConfig from '../../config/jwt.config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUser } from '../interfaces/active-user.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hashService: HashingService,
    private readonly prismaService: PrismaService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  private async checkUserExist(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.checkUserExist(email);

    if (!user) throw new ConflictException('Email not exists');

    const isMatch = await this.hashService.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('User or password not match');

    return await this.generateToken(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    if ((await this.checkUserExist(email)) !== null)
      throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashService.hash(password);
    const user = new UserEntity();
    user.email = email;
    user.password = hashedPassword;
    user.name = 'Anonymous';

    try {
      await this.prismaService.user.create({
        data: {
          ...user,
        },
      });
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
    };

    const [accessToken, refreshToken] = await Promise.all([
      //* accessToken
      this.signToken<Partial<ActiveUser>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        payload,
      ),
      //* refreshToken
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
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
