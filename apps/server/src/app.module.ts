import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { CloudModule } from '@server/cloud/feature';
import { AuthenticationModule } from '@server/iam/feature/authentication/feature';
import { AuthorizationModule } from '@server/iam/feature/authorization/feature';
import { PlansModule } from '@server/plans';
import { TasksModule } from '@server/tasks';
import { TodosModule } from '@server/todos';
import { CommentsModule } from '@server/comments';
import { LabelsModule } from '@server/labels';
import { UsersModule } from '@server/users';

@Module({
  imports: [
    PrismaModule.forRoot(),
    ConfigModule.forRoot(),
    CloudModule,
    AuthenticationModule,
    AuthorizationModule,
    UsersModule,
    PlansModule,
    TasksModule,
    TodosModule,
    CommentsModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
