import { Prisma } from '@prisma/client';
import { Info } from '../user/user.types';
import { Comment } from './comment.type';
import { Label } from './label.type';
import { Todo } from './todo.types';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string | Date;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'COMPLETED' | 'CLOSED';
  assignee: {
    info: Info;
  };
  planId: number;
  files: string[];
  order: number;
  priority?: number;
  labels?: Label[];
  comments?: Comment[];
  todos?: Todo[];
}

export interface CreateTask {
  title: string;
  description: string;
  dueDate: string | Date;
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'COMPLETED' | 'CLOSED';
  assignee: {
    connect: {
      email: string;
    };
  };
  plan: {
    connect: {
      id: number;
    };
  };
  order?: number;
  priority?: number;
}

export interface UpdateTask extends Partial<CreateTask> {
  todos?: {
    update: {
      where: Prisma.TodoWhereUniqueInput;
      data: Prisma.TodoUpdateInput;
    };
  };
  labels?: {
    update: {
      where: Prisma.LabelWhereUniqueInput;
      data: Prisma.LabelUpdateInput;
    };
  };
}
