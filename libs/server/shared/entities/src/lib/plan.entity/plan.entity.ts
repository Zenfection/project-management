import { ApiProperty } from '@nestjs/swagger';
import { Plan } from '@prisma/client';
import { IsAscii, IsDate, IsNumber, IsString } from 'class-validator';

export class PlanEntity implements Plan {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsAscii()
  slug: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  categoryPlanId: number;

  @ApiProperty()
  @IsNumber()
  ownerId: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
