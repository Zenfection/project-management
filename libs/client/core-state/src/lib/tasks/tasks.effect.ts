import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksState } from './tasks.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as TasksAction from './tasks.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  groupBy,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Task, Todo, Comment } from '@client/shared/interfaces';
import { selectSelectTaskId } from './tasks.selector';
import { selectPlanId } from '../plans/plans.selector';

@Injectable()
export class TasksEffects {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly actions$: Actions,
    private store: Store<TasksState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksAction.createTask),
      switchMap((action) => {
        return this._httpClient
          .post<Task>('api/tasks', action.createTaskData)
          .pipe(
            map((task) => TasksAction.createTaskSuccess({ task })),
            catchError((error: { message: string }) => {
              this.snackBar.open(
                `Failed to create task because: ${error.message}`,
                'Close',
                {
                  duration: 3000,
                },
              );
              return of(TasksAction.createTaskFailure({ error }));
            }),
          );
      }),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksAction.updateTask),
      withLatestFrom(this.store.select(selectSelectTaskId)),
      groupBy(([taskId]) => taskId),
      mergeMap((group$) => {
        return group$.pipe(
          concatMap(([action, taskId]) => {
            return this._httpClient
              .patch<Task>(`api/tasks/${taskId}`, action.task)
              .pipe(
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
              );
          }),
        );
      }),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksAction.deleteTask),
      withLatestFrom(this.store.select(selectPlanId)),
      exhaustMap(([action, planId]) => {
        return this._httpClient.delete<Task>(`api/tasks/${action.id}`).pipe(
          map((task) => TasksAction.deleteTaskSuccess({ task })),
          tap(() => {
            // return previous page
            this.router.navigate([`plan/${planId}`]);
          }),
          catchError((error: { message: string }) => {
            this.snackBar.open(
              `Failed to delete task because: ${error.message}`,
              'Close',
              {
                duration: 3000,
              },
            );
            return of(TasksAction.deleteTaskFailure({ error }));
          }),
        );
      }),
    );
  });

  createTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksAction.createTodo),
      switchMap((action) => {
        return this._httpClient
          .post<Todo>('api/todos', action.createTodoData)
          .pipe(
            map((todo) => TasksAction.createTodoSuccess({ todo })),
            catchError((error: { message: string }) => {
              this.snackBar.open(
                `Failed to create todo because: ${error.message}`,
                'Close',
                {
                  duration: 3000,
                },
              );
              return of(TasksAction.createTodoFailure({ error }));
            }),
          );
      }),
    );
  });

  updateTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksAction.updateTodo),
      switchMap((action) => {
        return this._httpClient
          .patch<Todo>(`api/todos/${action.todo.id}`, action.todo)
          .pipe(
            map((todo) => TasksAction.updateTodoSuccess({ todo })),
            catchError((error: { message: string }) => {
              this.snackBar.open(
                `Failed to update todo because: ${error.message}`,
                'Close',
                {
                  duration: 3000,
                },
              );
              return of(TasksAction.updateTodoFailure({ error }));
            }),
          );
      }),
    );
  });

  deleteTodo$ = createEffect(() => {
    ofType(TasksAction.deleteTodo);
    return this.actions$.pipe(
      ofType(TasksAction.deleteTodo),
      switchMap((action) => {
        return this._httpClient.delete<Todo>(`api/todos/${action.id}`).pipe(
          map((todo) => TasksAction.deleteTodoSuccess({ todo })),
          catchError((error: { message: string }) => {
            this.snackBar.open(
              `Failed to delete todo because: ${error.message}`,
              'Close',
              {
                duration: 3000,
              },
            );
            return of(TasksAction.deleteTodoFailure({ error }));
          }),
        );
      }),
    );
  });

  //! COMMENT EFFECTS
  createComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksAction.createComment),
      switchMap((action) => {
        return this._httpClient
          .post<Comment>('api/comments', action.createCommentData)
          .pipe(
            map((comment: Comment) =>
              TasksAction.createCommentSuccess({ comment }),
            ),
            catchError((error: { message: string }) => {
              this.snackBar.open(
                `Failed to create comment because: ${error.message}`,
                'Close',
                {
                  duration: 3000,
                },
              );
              return of(TasksAction.createCommentFailure({ error }));
            }),
          );
      }),
    );
  });
}
