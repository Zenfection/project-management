import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { Observable } from 'rxjs';
import { Task } from '@client/shared/interfaces';
import { selectAllTasks, selectSelectedTask } from './tasks.selector';
import { Dictionary } from '@ngrx/entity';
import * as TasksActions from './tasks.actions';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  tasks$: Observable<Dictionary<Task>> = this.store.select(selectAllTasks);
  selectedTask$: Observable<Task> = this.store.select(selectSelectedTask);

  constructor(private readonly store: Store<TasksState>) {}

  loadTasksSuccess(tasks: Task[]): void {
    this.store.dispatch(TasksActions.loadTasksSuccess({ tasks }));
  }

  selectTask(selectedTaskId: number): void {
    this.store.dispatch(TasksActions.selectTask({ selectedTaskId }));
  }

  deleteTaskSuccess(id: number): void {
    this.store.dispatch(TasksActions.deleteTaskSuccess({ id }));
  }
}
