import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsObject, IsString } from 'class-validator';

export class CreateTodoDto implements Prisma.TodoCreateInput {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsBoolean()
  isDone?: boolean;

  @ApiProperty()
  @IsObject()
  Task: Prisma.TaskCreateNestedOneWithoutTodosInput;

  // updatedAt?: string | Date | undefined;
  // createdAt?: string | Date | undefined;
}
