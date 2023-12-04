import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PlanService } from '../plan.service';
import { catchError, combineLatest, throwError } from 'rxjs';
import { Plan, Task } from '@client/shared/interfaces';

export const planDetailsResolver: ResolveFn<[Plan, Task[]]> = (
  route,
  state,
) => {
  const planService = inject(PlanService);
  const router = inject(Router);

  if (isNaN(Number(route.params.id))) {
    // Get the parent url
    const parentUrl = state.url.split('/').slice(0, -1).join('/');

    // Navigate to there
    router.navigateByUrl(parentUrl);

    // Throw an error
    return throwError(() => new Error('id not number'));
  }

  return combineLatest([
    planService.getPlanById(route.paramMap.get('id')),
    planService.getPlanTasks(route.paramMap.get('id')),
  ]).pipe(
    catchError((error) => {
      // Log the error
      console.error(error);

      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');

      // Navigate to there
      router.navigateByUrl(parentUrl);

      // Throw an error
      return throwError(() => new Error(error));
    }),
  );
};
