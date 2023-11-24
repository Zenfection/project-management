import { Prisma } from '@prisma/client';

export interface Todo {
  id?: number;
  content?: string;
  isDone?: boolean;
  taskId?: number;
}

export interface CreateTodo {
  content: string;
  isDone: boolean;
  Task: {
    connect: { id: number };
  };
}

export interface UpdateTodo extends Partial<CreateTodo> {
  todos: {
    updates: {
      where: Prisma.TodoWhereUniqueInput;
    };
    data: Prisma.TodoUpdateInput;
  };
}
