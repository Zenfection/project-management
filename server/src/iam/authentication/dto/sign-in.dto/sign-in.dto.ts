import { IsEmail, IsOptional, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @Length(6)
  tfaCode?: string;
}
