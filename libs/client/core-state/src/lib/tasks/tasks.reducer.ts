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

  on(TasksActions.createTaskSuccess, (state, action) => {
    return adapter.addOne(action.task, state);
  }),

  on(TasksActions.updateTaskSuccess, (state, action): TasksState => {
    return adapter.updateOne(
      {
        id: action.task.id,
        changes: {
          todos: action.task.todos,
        },
      },
      state,
    );
  }),

  on(TasksActions.updateTodoSuccess, (state, action) => {
    const taskId = action.todo.taskId;
    const task = state.entities[taskId];
    console.log(taskId, task);
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
);
