import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { SignUpDto } from '../dto/sign-up.dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto/sign-in.dto';
import { Auth } from '../decorators/auth/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { RefreshTokenDto } from '../dto/refresh-token.dto/refresh-token.dto';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
