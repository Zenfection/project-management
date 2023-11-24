import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Task } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaskEntity implements Task {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsEnum($Enums.TaskStatus)
  status: $Enums.TaskStatus;

  @ApiProperty()
  @IsNumber()
  assigneeId: number;

  @ApiProperty()
  @IsNumber()
  planId: number;

  @ApiProperty()
  @IsArray()
  files: string[];

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsNumber()
  priority: number;

  // @ApiProperty()
  // @IsOptional()
  // todos?: import('../todo.entity/todo.entity').TodoEntity[];

  // @ApiProperty()
  // @IsOptional()
  // comments?: import('../comment.entity/comment.entity').CommentEntity[];

  // @ApiProperty()
  // @IsOptional()
  // labels?: import('../label.entity/label.entity').LabelEntity[];

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
