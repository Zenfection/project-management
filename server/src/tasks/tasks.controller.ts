import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface';
import { ActiveUser } from '../iam/authentication/decorators/active-user/active-user.decorator';

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
    if (this.tasksService.checkPermission(user.email, Number(id))) {
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
