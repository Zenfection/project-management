import {
  IsBoolean,
  IsEmail,
  IsHash,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  @MinLength(8)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsHash('sha512')
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isTfaEnabled?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tfaSecret?: string;
}
