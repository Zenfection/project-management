import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto implements Prisma.TodoCreateInput {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDone?: boolean;

  @ApiProperty()
  @IsObject()
  Task: Prisma.TaskCreateNestedOneWithoutTodosInput;
}
