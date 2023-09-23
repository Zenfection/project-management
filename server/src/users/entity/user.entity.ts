import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { RoleEntity } from './role.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

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

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
