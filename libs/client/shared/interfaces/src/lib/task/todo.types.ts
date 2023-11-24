import { Prisma, Todo as TodoPrisma } from '@prisma/client';

export interface Todo extends TodoPrisma {}
export interface CreateTodo extends Prisma.TodoCreateInput {}
export interface UpdateTodo extends Partial<CreateTodo> {}
