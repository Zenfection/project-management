import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Task } from '@client/shared/interfaces';
import * as TasksActions from './tasks.actions';

// 1 define the state interface
export interface TasksState extends EntityState<Task> {
  selectedTaskId: number;
}

// 2 define the initial state
export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();
export const initialTasksState: TasksState = adapter.getInitialState({
  selectedTaskId: null,
});

// 3 define the reducer function
export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.loadTasksSuccess, (state, action) =>
    adapter.setAll(action.tasks, state),
  ),

  on(TasksActions.selectTask, (state, { selectedTaskId }) => ({
    ...state,
    selectedTaskId,
  })),

  on(TasksActions.updateTaskSuccess, (state, { task }) =>
    adapter.updateOne(
      { id: task.id, changes: task },
      { ...state, selectedTaskId: null },
    ),
  ),
);
