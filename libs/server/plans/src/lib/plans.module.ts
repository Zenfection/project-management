import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { PrismaService } from 'nestjs-prisma';
import { CloudModule } from '@server/cloud/feature';
import { TasksService } from '@server/tasks';

@Module({
  imports: [CloudModule],
  controllers: [PlansController],
  providers: [PlansService, PrismaService, TasksService],
})
export class PlansModule {}
