import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { Observable } from 'rxjs';
import {
  CreateComment,
  CreateTask,
  CreateTodo,
  Task,
  Todo,
  UpdateTask,
} from '@client/shared/interfaces';
import {
  selectAllTasks,
  selectLabels,
  selectNextPosition,
  selectSelectedTask,
} from './tasks.selector';
import * as TasksActions from './tasks.actions';
import { Label } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);
  labels$: Observable<Label[]> = this.store.select(selectLabels);
  selectedTask$: Observable<Task> = this.store.select(selectSelectedTask);
  nextPosition$: Observable<number> = this.store.select(selectNextPosition);

  constructor(private readonly store: Store<TasksState>) {}

  loadTasksSuccess(tasks: Task[]): void {
    this.store.dispatch(TasksActions.loadTasksSuccess({ tasks }));
  }

  loadLabelsSuccess(labels: Label[]): void {
    this.store.dispatch(TasksActions.loadLabelsSuccess({ labels }));
  }

  loadNextPosition(nextPosition: number): void {
    this.store.dispatch(TasksActions.loadNextPosition({ nextPosition }));
  }

  selectTask(selectedTaskId: number): void {
    this.store.dispatch(TasksActions.selectTask({ selectedTaskId }));
  }

  createTask(createTaskData: CreateTask): void {
    this.store.dispatch(TasksActions.createTask({ createTaskData }));
  }

  createTodo(createTodoData: CreateTodo): void {
    this.store.dispatch(TasksActions.createTodo({ createTodoData }));
  }

  updateTask(task: UpdateTask): void {
    this.store.dispatch(TasksActions.updateTask({ task }));
  }

  updateTodo(todo: Todo): void {
    this.store.dispatch(TasksActions.updateTodo({ todo }));
  }

  deleteTodo(id: number): void {
    this.store.dispatch(TasksActions.deleteTodo({ id }));
  }

  deleteTask(id: number): void {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  //! Comments
  createComment(createCommentData: CreateComment) {
    this.store.dispatch(TasksActions.createComment({ createCommentData }));
  }
}
