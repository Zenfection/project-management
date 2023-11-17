import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Plan } from '@client/shared/interfaces';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import * as PlansAction from './plans.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlansState } from './plans.reducer';
import { Store } from '@ngrx/store';
import { selectPlanId } from './plans.selector';

@Injectable()
export class PlansEffects {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly actions$: Actions,
    private store: Store<PlansState>,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  createPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansAction.createPlan),
      switchMap((action) =>
        this._httpClient.post<Plan>('api/plans', action.plan).pipe(
          map((plan: Plan) => PlansAction.createPlanSuccess({ plan })),
          tap(() => {
            this.snackBar.open('Plan created successfully.', 'Close', {
              duration: 3000,
            });
          }),
          catchError((error: { message: string }) => {
            this.snackBar.open('Failed to create plans.', 'Close', {
              duration: 3000,
            });
            return of(PlansAction.createPlanFailure({ error }));
          }),
        ),
      ),
    );
  });

  updatePlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansAction.updatePlan),
      withLatestFrom(this.store.select(selectPlanId)),
      switchMap(([action, planId]) =>
        this._httpClient.patch<Plan>(`api/plans/${planId}`, action.plan).pipe(
          map((plan: Plan) => PlansAction.updatePlanSuccess({ plan })),
          tap(() => {
            this.snackBar.open('Plan updated successfully.', 'Close', {
              duration: 3000,
            });
          }),
          catchError((error: { message: string }) => {
            this.snackBar.open(
              'Failed to update plan.' + error.message,
              'Close',
              {
                duration: 3000,
              },
            );
            return of(PlansAction.updatePlanFailure({ error }));
          }),
        ),
      ),
    );
  });

  deletePlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansAction.deletePlan),
      withLatestFrom(this.store.select(selectPlanId)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([action, planId]) =>
        this._httpClient.delete<Plan>(`api/plans/${planId}`).pipe(
          map((plan: Plan) => PlansAction.deletePlanSuccess({ plan })),
          tap(() => {
            this.snackBar.open('Plan deleted successfully.', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['plan']);
          }),
          catchError((error: { message: string }) => {
            this.snackBar.open('Failed to delete plan.', 'Close', {
              duration: 3000,
            });
            return of(PlansAction.deletePlanFailure({ error }));
          }),
        ),
      ),
    );
  });
}
