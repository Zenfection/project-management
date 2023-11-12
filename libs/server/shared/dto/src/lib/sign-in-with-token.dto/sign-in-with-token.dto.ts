import { IsNotEmpty } from 'class-validator';

export class SignInWithTokenDto {
  @IsNotEmpty()
  accessToken: string;
}
