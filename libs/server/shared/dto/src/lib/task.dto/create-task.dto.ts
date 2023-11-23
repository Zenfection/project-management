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
  Min,
  MinLength,
} from 'class-validator';

export class CreateTaskDto implements Prisma.TaskCreateInput {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  description?: string;

  @ApiProperty()
  @IsDate()
  dueDate?: Date;

  @ApiProperty()
  @IsEnum($Enums.TaskStatus)
  status?: $Enums.TaskStatus;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  files?: string[] | Prisma.TaskCreatefilesInput;

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
