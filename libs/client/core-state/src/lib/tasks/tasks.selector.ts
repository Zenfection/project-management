import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, adapter } from './tasks.reducer';
import { selectUser } from '../user/user.selector';

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

export const isOwnerSelectedTask = createSelector(
  selectSelectedTask,
  selectUser,
  (selectedTask, user) => {
    return selectedTask.assignee.info.email === user.info.email;
  },
);

export const selectSelectTaskId = createSelector(
  selectTaskState,
  (tasksState: TasksState) => tasksState.selectedTaskId,
);
