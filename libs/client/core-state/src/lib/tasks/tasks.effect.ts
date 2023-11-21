import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksState } from './tasks.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as TasksAction from './tasks.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Task } from '@client/shared/interfaces';

@Injectable()
export class PlansEffects {
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
      switchMap((action) =>
        this._httpClient
          .patch<Task>(`api/tasks/${action.tasks}`, action.tasks)
          .pipe(
            map((task: Task) => TasksAction.updateTaskSuccess({ task })),
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
