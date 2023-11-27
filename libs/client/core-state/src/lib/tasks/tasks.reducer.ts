import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Label, Task } from '@client/shared/interfaces';
import * as TasksActions from './tasks.actions';

// 1 define the state interface
export interface TasksState extends EntityState<Task> {
  selectedTaskId: number;
  labels: Label[];
}

// 2 define the initial state
export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();
export const initialTasksState: TasksState = adapter.getInitialState({
  selectedTaskId: null,
  labels: [],
});

// 3 define the reducer function
export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.loadTasksSuccess, (state, action) =>
    adapter.setAll(action.tasks, state),
  ),

  on(TasksActions.loadLabelsSuccess, (state, action) => ({
    ...state,
    labels: action.labels,
  })),

  on(TasksActions.selectTask, (state, { selectedTaskId }) => ({
    ...state,
    selectedTaskId,
  })),

  on(TasksActions.createTaskSuccess, (state, action) => {
    return adapter.addOne(action.task, state);
  }),

  on(TasksActions.updateTaskSuccess, (state, action): TasksState => {
    return adapter.updateOne(
      {
        id: action.task.id,
        changes: action.task,
      },
      state,
    );
  }),

  on(TasksActions.deleteTaskSuccess, (state, action) => {
    return adapter.removeOne(action.task.id, state);
  }),

  //! TODO REDUCER
  on(TasksActions.createTodoSuccess, (state, action) => {
    const taskId = action.todo.taskId;
    const task = state.entities[taskId];
    const todos = [...task.todos, action.todo];
    const updatedTask = { ...task, todos };

    return adapter.updateOne(
      {
        id: taskId,
        changes: updatedTask,
      },
      state,
    );
  }),

  on(TasksActions.updateTodoSuccess, (state, action) => {
    const taskId = action.todo.taskId;
    const task = state.entities[taskId];
    const todos = task.todos.map((todo) =>
      todo.id === action.todo.id ? action.todo : todo,
    );
    const updatedTask = { ...task, todos };
    return adapter.updateOne(
      {
        id: taskId,
        changes: updatedTask,
      },
      state,
    );
  }),

  on(TasksActions.deleteTodoSuccess, (state, action) => {
    const taskId = action.todo.taskId;
    const task = state.entities[taskId];
    // remove todo from task
    const todos = task.todos.filter((todo) => todo.id !== action.todo.id);
    const updatedTask = { ...task, todos };
    return adapter.updateOne(
      {
        id: taskId,
        changes: updatedTask,
      },
      state,
    );
  }),

  //! FILES REDUCER

  //! COMMENT REDUCER
  on(TasksActions.createCommentSuccess, (state, action) => {
    const taskId = action.comment.taskId;
    const task = state.entities[taskId];
    const comments = [...task.comments, action.comment];
    const updatedTask = { ...task, comments };

    return adapter.updateOne(
      {
        id: taskId,
        changes: updatedTask,
      },
      state,
    );
  }),
);
