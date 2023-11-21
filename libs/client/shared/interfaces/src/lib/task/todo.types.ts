import { Prisma } from '@prisma/client';

export interface Todo {
  id?: number;
  content?: string;
  isDone?: boolean;
  tasksId?: number;
}

export interface CreateTodo {}

export interface UpdateTodo extends Partial<CreateTodo> {
  todos: {
    updates: {
      where: Prisma.TodoWhereUniqueInput;
    };
    data: Prisma.TodoUpdateInput;
  };
}
