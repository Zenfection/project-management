import { Module } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { BcryptService } from '../hashing/bcrypt/bcrypt.service';
import { PrismaService } from 'nestjs-prisma';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import jwtConfig from '../config/jwt.config/jwt.config';
import { AccessTokenStrategy } from './strategies/access-token/access-token.strategy';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AuthenticationService,
    PrismaService,
    AccessTokenStrategy,
    AccessTokenGuard,
  ],
  imports: [
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
