import { Task, UpdateTask } from '@client/shared/interfaces';
import { createAction, props } from '@ngrx/store';

export const loadTasksSuccess = createAction(
  '[TASKS] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);

export const selectTask = createAction(
  '[TASKS] Select Task',
  props<{ selectedTaskId: number }>(),
);

//! Update
export const updateTask = createAction(
  '[TASKS] Update Tasks',
  props<{ tasks: UpdateTask }>(),
);
export const updateTaskSuccess = createAction(
  '[TASKS] Update Tasks Success',
  props<{ task: Task }>(),
);
export const updateTasksFailure = createAction(
  '[TASKS] Update Tasks Failure',
  props<{ error: { message: string } }>(),
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
