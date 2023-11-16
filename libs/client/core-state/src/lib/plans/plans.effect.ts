import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Plan } from '@client/shared/interfaces';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as PlansAction from './plans.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PlansEffects {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  createPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansAction.createPlan),
      exhaustMap((action) =>
        this._httpClient.post<Plan>('api/plans', action.plan).pipe(
          map((plan: Plan) => PlansAction.createPlanSuccess({ plan })),
          catchError((error: { message: string }) => {
            this.snackBar.open('Failed to create plans.', 'Close', {
              duration: 3000,
            });
            return of(PlansAction.createPlanFailure({ error }));
          }),
          tap(() => {
            this.snackBar.open('Plan created successfully.', 'Close', {
              duration: 3000,
            });
          }),
        ),
      ),
    );
  });
}
