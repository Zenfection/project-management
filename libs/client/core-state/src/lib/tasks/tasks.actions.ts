import { CreateTask, Task, Todo, UpdateTask } from '@client/shared/interfaces';
import { createAction, props } from '@ngrx/store';

export const loadTasksSuccess = createAction(
  '[TASKS] Load Tasks Success',
  props<{ tasks: Task[] }>(),
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

//! Update
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

//! Delete
export const deleteTask = createAction('[TASKS] Delete Task');
export const deleteTaskSuccess = createAction(
  '[TASKS] Delete Task Success',
  props<{ id: number }>(),
);
export const deleteTaskFailure = createAction(
  '[TASKS] Delete Task Failure',
  props<{ error: { message: string } }>(),
);
