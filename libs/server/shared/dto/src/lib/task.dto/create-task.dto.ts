import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto implements Prisma.TaskCreateInput {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty()
  @IsEnum($Enums.TaskStatus)
  status?: $Enums.TaskStatus;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  files?: Prisma.FileCreateNestedManyWithoutTaskInput;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priority?: number;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  assignee?: Prisma.UserCreateNestedOneWithoutTasksInput;

  @ApiProperty()
  @IsObject()
  plan: Prisma.PlanCreateNestedOneWithoutTasksInput;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  todos?: Prisma.TodoCreateNestedManyWithoutTaskInput;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  labels?: Prisma.LabelCreateNestedManyWithoutTasksInput;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  comments?: Prisma.CommentCreateNestedManyWithoutTaskInput;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  Activity?: Prisma.ActivityCreateNestedManyWithoutTaskInput;
}
