import { Prisma, TaskStatus } from '@prisma/client';
import { Member } from './member.types';
import { CategoryPlan } from './category.types';

export interface Plan {
  id: number;
  title: string;
  slug: string;
  description: string;
  owner: Member;
  members: Member[];
  category: CategoryPlan;

  tasks: {
    status: TaskStatus;
    dueDate: Date;
    _count: {
      todos: number;
      files: number;
    };
  }[];
  _count: { tasks: number };
}

export interface CreatePlan {
  title: string;
  slug: string;
  description: string;
  owner: {
    connect: {
      email: string;
    };
  };
  members: {
    connect: {
      email: string;
    }[];
  };
  category: {
    connect: {
      slug: string;
    };
  };
}

export interface UpdatePlan extends Partial<CreatePlan> {
  todos?: {
    update: {
      where: Prisma.TodoWhereUniqueInput;
      data: Prisma.TodoUpdateInput;
    };
  };
  members?: {
    set: [];
    connect: {
      email: string;
    }[];
  };
}
