import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UnauthorizedException,
  Patch,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import { UpdateTaskDto } from './dto/update-task.dto';

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
      { labels: true, todos: true },
    );
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
  async updateTask(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserData,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    // if (await this.tasksService.checkPermission(user.email, Number(id))) {
    //   throw new UnauthorizedException('Permission denied');
    // }

    return this.tasksService.update({ id: Number(id) }, updateTaskDto, {
      labels: true,
      todos: true,
    });
  }
}
