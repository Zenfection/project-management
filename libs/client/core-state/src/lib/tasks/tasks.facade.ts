import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { Observable } from 'rxjs';
import { Task, UpdateTask } from '@client/shared/interfaces';
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

  updateTask(task: UpdateTask): void {
    this.store.dispatch(TasksActions.updateTask({ task }));
  }

  updateTodoSuccess(task: Task): void {
    this.store.dispatch(TasksActions.updateTodoSuccess({ task }));
  }

  deleteTaskSuccess(id: number): void {
    this.store.dispatch(TasksActions.deleteTaskSuccess({ id }));
  }
}
