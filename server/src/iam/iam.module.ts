import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [],
  controllers: [],
  imports: [AuthenticationModule],
})
export class IamModule {}
