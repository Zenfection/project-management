import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksState } from './tasks.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as TasksAction from './tasks.actions';
import {
  catchError,
  concatMap,
  debounceTime,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Task } from '@client/shared/interfaces';
import { selectSelectTaskId } from './tasks.selector';

@Injectable()
export class TasksEffects {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly actions$: Actions,
    private store: Store<TasksState>,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksAction.updateTask),
      withLatestFrom(this.store.select(selectSelectTaskId)),
      exhaustMap(([action, taskId]) =>
        this._httpClient.patch<Task>(`api/tasks/${taskId}`, action.task).pipe(
          map((task) => TasksAction.updateTaskSuccess({ task })),
          catchError((error: { message: string }) => {
            this.snackBar.open(
              `Failed to update task because: ${error.message}`,
              'Close',
              {
                duration: 3000,
              },
            );
            return of(TasksAction.updateTasksFailure({ error }));
          }),
        ),
      ),
    );
  });
}
