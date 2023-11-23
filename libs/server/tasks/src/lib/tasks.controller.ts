import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TasksService } from './tasks.service';

import { AvatarInterceptor } from '@server/cloud/utils';
import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import { CreateTaskDto, UpdateTaskDto } from '@server/shared/dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  async getTask(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    const checkPermission = await this.tasksService.checkPermission(
      user.email,
      Number(id),
    );

    if (checkPermission) {
      throw new UnauthorizedException('Permission denied');
    }

    return this.tasksService.findOne(
      { id: Number(id) },
      { labels: true, todos: true, comments: true },
    );
  }

  @Post()
  @UseInterceptors(AvatarInterceptor)
  createTask(
    @ActiveUser() user: ActiveUserData,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create({
      data: createTaskDto,
      include: {
        labels: true,
        todos: true,
        comments: true,
        assignee: {
          select: { info: true },
        },
      },
    });
  }

  @Post(':id/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserData,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              '.(doc|docx|log|odt|pages|rtf|txt|csv|key|pps|ppt|pptx|tar|xml|json|pdf|xls|xlsx|db|sql|rar|gz|zip)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (await this.tasksService.checkPermission(user.email, Number(id))) {
      throw new UnauthorizedException('Permission denied');
    }

    return this.tasksService.uploadFile(
      { id: Number(id) },
      Number(id),
      file.originalname,
      file.buffer,
    );
  }

  @Patch(':id')
  @UseInterceptors(AvatarInterceptor)
  async updateTask(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserData,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    // if (await this.tasksService.checkPermission(user.email, Number(id))) {
    //   throw new UnauthorizedException('Permission denied');
    // }

    return this.tasksService.update({
      where: { id: Number(id) },
      data: updateTaskDto,
      include: {
        labels: true,
        todos: true,
        assignee: {
          include: { info: true },
        },
        comments: true,
      },
    });
  }
}
