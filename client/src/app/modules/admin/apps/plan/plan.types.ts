import { User } from 'app/core/user/user.types';
import { assign } from 'lodash-es';
export interface Category {
  id?: string;
  title?: string;
  slug?: string;
}

interface Member {
  id: number;
  deparment: string;
  info: {
    name: string;
    avatar: string;
    email: string;
    phone?: string;
  };
}

export interface Plan {
  id: number;
  title: string;
  slug: string;
  description: string;
  owner: Member;
  members: Member[];
  category: string;
}

export interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

export interface PlanTasks {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'COMPLETE' | 'CLOSED';
  assignee: User;
  labels: string[];
  todos: Todo[];
}

// export interface Course {
//   id?: string;
//   title?: string;
//   slug?: string;
//   description?: string;
//   category?: string;
//   duration?: number;
//   steps?: {
//     order?: number;
//     title?: string;
//     subtitle?: string;
//     content?: string;
//   }[];
//   totalSteps?: number;
//   updatedAt?: number;
//   featured?: boolean;
//   progress?: {
//     currentStep?: number;
//     completed?: number;
//   };
// }
