import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

export const selectTaskState = createFeatureSelector<TasksState>('tasks');
export const selectAllTasks = createSelector(
  selectTaskState,
  (tasksState: TasksState) => tasksState.entities,
);
export const selectSelectedTask = createSelector(
  selectTaskState,
  (tasksState: TasksState) => tasksState.entities[tasksState.selectedTaskId],
);
