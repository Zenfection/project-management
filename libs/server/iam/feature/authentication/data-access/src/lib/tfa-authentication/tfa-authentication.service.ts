import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { authenticator } from 'otplib';

@Injectable()
export class TfaAuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateSecret(email: string) {
    const secret = authenticator.generateSecret();
    const appName = this.configService.getOrThrow<string>('TFA_APP_NAME');
    const uri = authenticator.keyuri(email, appName, secret);

    return {
      secret,
      uri,
    };
  }

  verifyCode(code: string, secret: string) {
    return authenticator.verify({ token: code, secret });
  }

  async enableTfaSecret(email: string, secret: string) {
    const id = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    await this.prismaService.user.update({
      where: {
        id: id.id,
      },
      data: {
        isTfaEnabled: true,
        tfaSecret: secret,
      },
    });
  }
}
