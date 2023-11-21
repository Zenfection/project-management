import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@prisma/client';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class TodoEntity implements Todo {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsBoolean()
  isDone: boolean;

  @ApiProperty()
  @IsNumber()
  taskId: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<TodoEntity>) {
    Object.assign(this, partial);
  }
}
