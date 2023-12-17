import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  CustomPrismaModule,
  CustomPrismaService,
  PrismaService,
} from 'nestjs-prisma';
import { CloudModule } from '@server/cloud/feature';

@Module({
  imports: [CloudModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CustomPrismaService],
  exports: [UsersService],
})
export class UsersModule {}
