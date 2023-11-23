import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { Observable } from 'rxjs';
import { CreateTask, Task, Todo, UpdateTask } from '@client/shared/interfaces';
import { selectAllTasks, selectSelectedTask } from './tasks.selector';
import * as TasksActions from './tasks.actions';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);
  selectedTask$: Observable<Task> = this.store.select(selectSelectedTask);

  constructor(private readonly store: Store<TasksState>) {}

  loadTasksSuccess(tasks: Task[]): void {
    this.store.dispatch(TasksActions.loadTasksSuccess({ tasks }));
  }

  selectTask(selectedTaskId: number): void {
    this.store.dispatch(TasksActions.selectTask({ selectedTaskId }));
  }

  createTask(createTaskData: CreateTask): void {
    this.store.dispatch(TasksActions.createTask({ createTaskData }));
  }

  updateTask(task: UpdateTask): void {
    this.store.dispatch(TasksActions.updateTask({ task }));
  }

  updateTodo(todo: Todo): void {
    this.store.dispatch(TasksActions.updateTodo({ todo }));
  }

  deleteTaskSuccess(id: number): void {
    this.store.dispatch(TasksActions.deleteTaskSuccess({ id }));
  }
}
