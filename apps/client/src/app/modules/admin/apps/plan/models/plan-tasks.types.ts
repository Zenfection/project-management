import { Member } from './member.types';

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

export interface PlanTasks {
  id: number;
  title: string;
  description: string;
  files: string[];
  dueDate: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'COMPLETED' | 'CLOSED';
  assignee: Member;
  labels: string[];
  todos: Todo[];
}
