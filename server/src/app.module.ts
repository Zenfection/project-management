import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CloudModule } from './cloud/cloud.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    ConfigModule.forRoot(),
    CloudModule,
    UsersModule,
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
