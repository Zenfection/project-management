import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto implements Prisma.TaskCreateInput {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsDate()
  dueDate?: Date;

  @ApiProperty()
  @IsEnum($Enums.TaskStatus)
  status?: $Enums.TaskStatus;

  @ApiProperty()
  @IsArray()
  files?: string[] | Prisma.TaskCreatefilesInput;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priority?: number;

  // createdAt?: string | Date;
  // updatedAt?: string | Date;
  @IsObject()
  assignee?: Prisma.UserCreateNestedOneWithoutTasksInput;

  @IsObject()
  plan: Prisma.PlanCreateNestedOneWithoutTasksInput;

  @IsObject()
  todos?: Prisma.TodoCreateNestedManyWithoutTaskInput;

  @IsObject()
  labels?: Prisma.LabelCreateNestedManyWithoutTasksInput;

  @IsObject()
  comments?: Prisma.CommentCreateNestedManyWithoutTaskInput;

  @IsObject()
  Activity?: Prisma.ActivityCreateNestedManyWithoutTaskInput;
}
