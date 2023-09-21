import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { RefreshTokenIdsStorage } from './utils/refresh-token-ids.storage/refresh-token-ids.storage';
import { SessionAuthenticationService } from './services/session-authentication/session-authentication.service';
import { SessionAuthenticationController } from './controllers/session-authentication/session-authentication.controller';

import passport from 'passport';
import session from 'express-session';
import Redis from 'ioredis';
import createRedisStore from 'connect-redis';
import { UserSerializer } from './utils/user-serializer/user-serializer';

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
    RefreshTokenIdsStorage,
    AuthenticationService,
    PrismaService,
    AccessTokenStrategy,
    AccessTokenGuard,
    SessionAuthenticationService,
    UserSerializer,
  ],
  imports: [
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthenticationController, SessionAuthenticationController],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const RedisStore = createRedisStore(session);
    consumer
      .apply(
        session({
          store: new RedisStore({
            client: new Redis(process.env.REDIS_URL),
          }),
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: { sameSite: true, httpOnly: true },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
