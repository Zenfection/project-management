import { Module } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cloudflare_r2Config from './config/cloudflare_r2.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forFeature(cloudflare_r2Config),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get('UPLOAD_RATE_TTL') || 60,
          limit: configService.get('UPLOAD_RATE_LIMIT') || 10,
        },
      ],
    }),
  ],
  controllers: [CloudController],
  providers: [
    CloudService,
    {
      provide: APP_GUARD,
      useValue: ThrottlerGuard,
    },
  ],
  exports: [CloudService],
})
export class CloudModule {}
