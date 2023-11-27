import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [LabelsController],
  providers: [LabelsService, PrismaService],
})
export class LabelsModule {}
