import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Info } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  MinLength,
} from 'class-validator';

export class InfoEntity implements Info {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @MinLength(8)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum($Enums.UserStatus)
  status: $Enums.UserStatus;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('VN')
  phone: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
