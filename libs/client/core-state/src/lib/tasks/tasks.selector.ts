import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, adapter } from './tasks.reducer';

const { selectAll } = adapter.getSelectors();

export const selectTaskState = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(selectTaskState, selectAll);

export const selectLabels = createSelector(
  selectTaskState,
  (tasksState: TasksState) => tasksState.labels,
);

export const selectNextPosition = createSelector(
  selectTaskState,
  (tasksState: TasksState) => tasksState.nextPosition,
);

export const selectSelectedTask = createSelector(
  selectTaskState,
  (tasksState: TasksState) => tasksState.entities[tasksState.selectedTaskId],
);

export const selectSelectTaskId = createSelector(
  selectTaskState,
  (tasksState: TasksState) => tasksState.selectedTaskId,
);
