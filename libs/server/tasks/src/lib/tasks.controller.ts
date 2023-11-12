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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';

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
  // @Post()
  // create(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.create(createTaskDto);
  // }

  // @Get()
  // findAll() {
  //   return this.tasksService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tasksService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tasksService.remove(+id);
  // }
}
