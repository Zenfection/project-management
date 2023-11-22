import { $Enums, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleEntity } from './role.entity';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  @Exclude()
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
  @IsEnum($Enums.Deparment)
  department: $Enums.Deparment;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
