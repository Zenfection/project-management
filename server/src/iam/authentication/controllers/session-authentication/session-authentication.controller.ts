import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { promisify } from 'util';
import { AuthType } from '../../enums/auth-type.enum';
import { Auth } from '../../decorators/auth/auth.decorator';
import { SessionAuthenticationService } from '../../services/session-authentication/session-authentication.service';
import { SignInDto } from '../../dto/sign-in.dto/sign-in.dto';
import { ActiveUser } from '../../decorators/active-user/active-user.decorator';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

@Auth(AuthType.None)
@Controller('session-authentication')
export class SessionAuthenticationController {
  constructor(
    private readonly sessionAuthService: SessionAuthenticationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Req() request: Request, @Body() signInDto: SignInDto) {
    const user = await this.sessionAuthService.signIn(signInDto);
    await promisify(request.logIn.bind(request))(user);
  }

  @Get('test')
  async sayHello(@ActiveUser() user: ActiveUserData) {
    return `Hello ${user.email}`;
  }
}
