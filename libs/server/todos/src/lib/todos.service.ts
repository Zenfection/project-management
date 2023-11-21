import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  private checkEmptyDataUpdate(data: UpdateTodoDto) {
    if (Object.keys(data).length === 0) {
      throw new UnauthorizedException('Data is empty');
    }
  }

  async checkPermission(userId: string, todoId: string) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.prismaService.todo.create({
      data: createTodoDto,
    });

    return todo;
  }

  async findAll(include?: Prisma.TodoInclude): Promise<Todo[]> {
    return this.prismaService.todo.findMany({
      include,
    });
  }

  findOne(params: {
    where: Prisma.TodoWhereUniqueInput;
    include?: Prisma.TodoInclude;
  }) {
    const { where, include } = params;
    return this.prismaService.todo.findUnique({
      where,
      include,
    });
  }

  findFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
    include?: Prisma.TodoInclude;
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: UpdateTodoDto;
    include?: Prisma.TodoInclude;
  }): Promise<Todo> {
    const { where, data, include } = params;
    this.checkEmptyDataUpdate(data);
    return this.prismaService.todo.update({
      where,
      data,
      include,
    });
  }

  remove(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prismaService.todo.delete({
      where,
    });
  }
}
