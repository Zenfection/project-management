import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignInDto {
  @ApiProperty({
    example: 'abc@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
  })
  @MinLength(8)
  password: string;
}
