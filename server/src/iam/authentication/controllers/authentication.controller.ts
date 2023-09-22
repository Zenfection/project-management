import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { SignUpDto } from '../dto/sign-up.dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto/sign-in.dto';
import { Auth } from '../decorators/auth/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { RefreshTokenDto } from '../dto/refresh-token.dto/refresh-token.dto';
import { ActiveUser } from '../decorators/active-user/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { TfaAuthenticationService } from '../services/tfa-authentication/tfa-authentication.service';

import { Response } from 'express';
import { toFileStream } from 'qrcode';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly tfaSerivce: TfaAuthenticationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.Bearer)
  @Post('tfa/generate')
  async generateQrCode(
    @Res() response: Response,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    const { uri, secret } = await this.tfaSerivce.generateSecret(
      activeUser.email,
    );

    await this.tfaSerivce.enableTfaSecret(activeUser.email, secret);

    response.type('png');
    return toFileStream(response, uri);
  }
}
