import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { SignUpDto } from '../dto/sign-up.dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto/sign-in.dto';
import { AccessTokenStrategy } from '../strategies/access-token/access-token.strategy';
import { Auth } from '../decorators/auth/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly accessTokenStrategy: AccessTokenStrategy,
  ) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
