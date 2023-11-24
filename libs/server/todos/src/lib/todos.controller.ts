import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import { Roles } from '@server/iam/feature/authorization/utils';
import { RoleEntity, RoleEnum } from '@server/shared/entities';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(createTodoDto);
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @Roles(RoleEnum.thu_ky_khoa, RoleEnum.truong_khoa)
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne({
      where: {
        id: +id,
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update({
      where: {
        id: +id,
      },
      data: updateTodoDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove({
      id: +id,
    });
  }
}
