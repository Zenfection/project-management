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
import { SessionAuthenticationService } from '@server/iam/feature/authentication/data-access';
import { SignInDto } from '@server/shared/dto';
import {
  ActiveUser,
  ActiveUserData,
  AuthType,
  Auth,
} from '@server/iam/feature/authentication/utils';

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
