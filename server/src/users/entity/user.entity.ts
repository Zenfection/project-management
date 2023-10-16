import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { RoleEntity } from './role.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isTfaEnabled: boolean;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  tfaSecret: string | null;

  @ApiProperty()
  roles: RoleEntity[];

  @ApiProperty()
  @IsNumber()
  deparmentId: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
