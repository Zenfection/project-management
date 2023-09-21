import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [PrismaModule.forRoot(), IamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
