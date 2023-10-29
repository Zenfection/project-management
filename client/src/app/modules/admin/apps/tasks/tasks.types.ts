import { User } from 'app/core/user/user.types';

export interface Tag {
  id?: string;
  title?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'COMPLETED' | 'CLOSED';
  completed: boolean;
  assginTo: User;
  dueDate: string | null; //! Warning
  priority: 0 | 1 | 2;
  order: number;

  type: 'task' | 'section';
  tags: string[];
  notes: string;
}
