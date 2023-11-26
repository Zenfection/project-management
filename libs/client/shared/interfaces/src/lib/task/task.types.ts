import { Info } from '../user/user.types';
import { Comment } from './comment.type';
import { Label } from './label.type';
import { Todo } from './todo.types';
import { Prisma, Task as TaskPrisma } from '@prisma/client';

export interface Task extends TaskPrisma {
  todos?: Todo[];
  comments?: Comment[];
  labels?: Label[];
  files?: File[];
  assignee: {
    info: Info;
  };
}

export interface CreateTask extends Prisma.TaskCreateInput {}
export interface UpdateTask extends Prisma.TaskUpdateInput {}
