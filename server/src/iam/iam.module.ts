import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  providers: [],
  controllers: [],
  imports: [AuthenticationModule],
})
export class IamModule {}
