import { ApiProperty } from '@nestjs/swagger';
import { Plan } from '@prisma/client';
import { IsAscii, IsString } from 'class-validator';

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
  categoryPlanId: number;

  @ApiProperty()
  ownerId: number;

  createdAt: Date;
  updatedAt: Date;
}
