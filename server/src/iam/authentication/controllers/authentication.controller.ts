import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
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
import { SignInWithTokenDto } from '../dto/sign-in-with-token.dto/sign-in-with-token.dto';
import { User } from '@prisma/client';
import { TransformInterceptor } from '../../../cloud/interceptors/transform/transform.interceptor';

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

  @UseInterceptors(TransformInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<User> {
    const user = await this.authService.signIn(signInDto);
    return user;
  }

  @UseInterceptors(TransformInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in-with-token')
  async signInWithToken(
    @Body() signInWithToken: SignInWithTokenDto,
  ): Promise<User> {
    const user = await this.authService.signInWithToken(signInWithToken);
    return user;
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
