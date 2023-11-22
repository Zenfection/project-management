import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsObject, IsString } from 'class-validator';

export class CreateCommentDto implements Prisma.CommentCreateInput {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsObject()
  task: Prisma.TaskCreateNestedOneWithoutCommentsInput;

  @ApiProperty()
  @IsObject()
  user: Prisma.UserCreateNestedOneWithoutCommentInput;
}
