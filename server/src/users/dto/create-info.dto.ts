import { $Enums, Prisma } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateInfoDto implements Prisma.InfoCreateInput {
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum($Enums.UserStatus)
  status?: $Enums.UserStatus;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;

  @IsOptional()
  user: Prisma.UserCreateNestedOneWithoutInfoInput;
}
