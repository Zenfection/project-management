import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CloudModule } from '@server/cloud/feature';

@Module({
  imports: [CloudModule],
  controllers: [CommentsController],
  providers: [PrismaService, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
