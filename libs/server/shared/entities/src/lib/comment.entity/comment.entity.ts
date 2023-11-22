import { Comment } from '@prisma/client';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CommentEntity implements Comment {
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsNumber()
  taskId: number;

  @IsNumber()
  userId: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
