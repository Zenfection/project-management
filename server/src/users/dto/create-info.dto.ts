import { $Enums, Prisma } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
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
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;

  @IsOptional()
  user: Prisma.UserCreateNestedOneWithoutInfoInput;
}
