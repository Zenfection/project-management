import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {
  SignInDto,
  SignUpDto,
  RefreshTokenDto,
  SignInWithTokenDto,
} from '@server/shared/dto';
import {
  AuthType,
  Auth,
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import {
  TfaAuthenticationService,
  AuthenticationService,
} from '@server/iam/feature/authentication/data-access';

import { Response } from 'express';
import { toFileStream } from 'qrcode';
import { User } from '@prisma/client';
import { AvatarInterceptor } from '@server/cloud/utils';
import { UserEntity } from '@server/shared/entities';

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

  @UseInterceptors(AvatarInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<User> {
    const user = await this.authService.signIn(signInDto);
    return new UserEntity(user);
  }

  @UseInterceptors(AvatarInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in-with-token')
  async signInWithToken(
    @Body() signInWithToken: SignInWithTokenDto,
  ): Promise<User> {
    const user = await this.authService.signInWithToken(signInWithToken);
    return new UserEntity(user);
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
