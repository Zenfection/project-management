import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { PrismaService } from 'nestjs-prisma';
import { CloudModule } from '../cloud/cloud.module';

@Module({
  imports: [CloudModule],
  controllers: [PlansController],
  providers: [PlansService, PrismaService],
})
export class PlansModule {}
