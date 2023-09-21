import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { SignInDto } from '../../dto/sign-in.dto/sign-in.dto';
import { HashingService } from '../../../hashing/hashing.service';

@Injectable()
export class SessionAuthenticationService {
  constructor(
    private readonly hashService: HashingService,
    private prismaSerive: PrismaService,
  ) {}

  private async checkExist(email: string): Promise<User | null> {
    return await this.prismaSerive.user.findUnique({
      where: {
        email,
      },
    });
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.checkExist(signInDto.email);
    if (!user) throw new ConflictException('Email not exists');

    const isMatch = await this.hashService.compare(
      signInDto.password,
      user.password,
    );

    if (!isMatch) throw new UnauthorizedException('User or password not match');

    return user;
  }
}
