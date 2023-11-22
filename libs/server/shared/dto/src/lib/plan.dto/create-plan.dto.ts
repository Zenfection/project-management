import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto implements Prisma.PlanCreateInput {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsObject()
  owner: Prisma.UserCreateNestedOneWithoutOwnedPlansInput;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  tasks?: Prisma.TaskCreateNestedManyWithoutPlanInput;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  members?: Prisma.UserCreateNestedManyWithoutMemberPlansInput;

  @ApiProperty()
  @IsObject()
  category: Prisma.CategoryPlanCreateNestedOneWithoutPlansInput;
}
