import { Module } from '@nestjs/common';
import { HashingService, BcryptService } from '@server/iam/utils';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from '@server/iam/feature/authentication/data-access';
import { AuthenticationController } from './controllers/authentication.controller';
import { jwtConfig } from '@server/shared/config';
import {
  AccessTokenGuard,
  AuthenticationGuard,
  AccessTokenStrategy,
  RefreshTokenIdsStorage,
} from '@server/iam/feature/authentication/utils';
import { APP_GUARD } from '@nestjs/core';

//! DEPRECATED
// import { SessionAuthenticationService } from './services/session-authentication/session-authentication.service';
// import { SessionAuthenticationController } from './controllers/session-authentication/session-authentication.controller';
// import passport from 'passport';
// import session from 'express-session';
// import Redis from 'ioredis';
// import createRedisStore from 'connect-redis';
// import { UserSerializer } from './utils/user-serializer/user-serializer';

import { UsersService } from '@server/users';
import { PrismaService } from 'nestjs-prisma';
import { TfaAuthenticationService } from '@server/iam/feature/authentication/data-access';
import { CloudModule } from '@server/cloud/feature';

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
    PrismaService,
    UsersService,
    RefreshTokenIdsStorage,
    AuthenticationService,
    AccessTokenStrategy,
    AccessTokenGuard,
    TfaAuthenticationService,
    // ! SESSION DEPRECATED
    // UserSerializer,
    // SessionAuthenticationService,
  ],
  imports: [
    CloudModule,
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [
    AuthenticationController,
    // ! SESSION DEPRECATED
    // SessionAuthenticationController
  ],
})
export class AuthenticationModule {}

// ! SESSION DEPRECATED
// export class AuthenticationModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     const RedisStore = createRedisStore(session);
//     consumer
//       .apply(
//         session({
//           store: new RedisStore({
//             client: new Redis(process.env.REDIS_URL),
//           }),
//           secret: process.env.SESSION_SECRET,
//           resave: false,
//           saveUninitialized: false,
//           cookie: { sameSite: true, httpOnly: true },
//         }),
//         passport.initialize(),
//         passport.session(),
//       )
//       .forRoutes('*');
//   }
// }
