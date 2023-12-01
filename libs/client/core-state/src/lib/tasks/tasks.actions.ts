import {
  Comment,
  CreateComment,
  CreateTask,
  CreateTodo,
  Label,
  Task,
  Todo,
  UpdateTask,
} from '@client/shared/interfaces';
import { createAction, props } from '@ngrx/store';

export const loadTasksSuccess = createAction(
  '[TASKS] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);

export const loadLabelsSuccess = createAction(
  '[TASKS] Load Labels Success',
  props<{ labels: Label[] }>(),
);

export const loadNextPosition = createAction(
  '[TASKS] Load Next Position',
  props<{ nextPosition: number }>(),
);

export const selectTask = createAction(
  '[TASKS] Select Task',
  props<{ selectedTaskId: number }>(),
);

//! Create Task
export const createTask = createAction(
  '[TASKS] Create Task',
  props<{ createTaskData: CreateTask }>(),
);
export const createTaskSuccess = createAction(
  '[TASKS] Create Task Success',
  props<{ task: Task }>(),
);
export const createTaskFailure = createAction(
  '[TASKS] Create Task Failure',
  props<{ error: { message: string } }>(),
);

//! Create Todo
export const createTodo = createAction(
  '[TASKS] Create Temporary Task',
  props<{ createTodoData: CreateTodo }>(),
);

export const createTodoSuccess = createAction(
  '[TASKS] Create Temporary Task Success',
  props<{ todo: Todo }>(),
);

export const createTodoFailure = createAction(
  '[TASKS] Create Temporary Task Failure',
  props<{ error: { message: string } }>(),
);

//! Update Task
export const updateTask = createAction(
  '[TASKS] Update Tasks',
  props<{ task: UpdateTask }>(),
);
export const updateTaskSuccess = createAction(
  '[TASKS] Update Tasks Success',
  props<{ task: Task }>(),
);
export const updateTasksFailure = createAction(
  '[TASKS] Update Tasks Failure',
  props<{ error: { message: string } }>(),
);

//! Update Todo
export const updateTodo = createAction(
  '[TASKS] Update Temporary Task',
  props<{ todo: Todo }>(),
);

export const updateTodoFailure = createAction(
  '[TASKS] Update Temporary Task Failure',
  props<{ error: { message: string } }>(),
);

export const updateTodoSuccess = createAction(
  '[TASKS] Update Todo Task',
  props<{ todo: Todo }>(),
);

//! Delete Task
export const deleteTask = createAction(
  '[TASKS] Delete Task',
  props<{ id: number }>(),
);
export const deleteTaskSuccess = createAction(
  '[TASKS] Delete Task Success',
  props<{ task: Task }>(),
);
export const deleteTaskFailure = createAction(
  '[TASKS] Delete Task Failure',
  props<{ error: { message: string } }>(),
);

//! Delete Todo
export const deleteTodo = createAction(
  '[TASKS] Delete Todo',
  props<{ id: number }>(),
);
export const deleteTodoSuccess = createAction(
  '[TASKS] Delete Todo Success',
  props<{ todo: Todo }>(),
);
export const deleteTodoFailure = createAction(
  '[TASKS] Delete Todo Failure',
  props<{ error: { message: string } }>(),
);

//! Create Comment
export const createComment = createAction(
  '[TASKS] Create Comment',
  props<{ createCommentData: CreateComment }>(),
);
export const createCommentSuccess = createAction(
  '[TASKS] Create Comment Success',
  props<{ comment: Comment }>(),
);
export const createCommentFailure = createAction(
  '[TASKS] Create Comment Failure',
  props<{ error: { message: string } }>(),
);
