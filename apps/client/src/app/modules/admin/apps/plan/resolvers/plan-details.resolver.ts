import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PlanService } from '../services/plan.service';
import { PlanTasksService } from '../services/plan-tasks.service';
import { catchError, combineLatest, throwError } from 'rxjs';
import { Plan } from '../models/plan.types';
import { PlanTasks } from '../models/plan-tasks.types';

export const planDetailsResolver: ResolveFn<[Plan, PlanTasks[]]> = (
  route,
  state
) => {
  const planService = inject(PlanService);
  const planTaskService = inject(PlanTasksService);
  const router = inject(Router);

  return combineLatest([
    planService.getPlanById(route.paramMap.get('id')),
    planTaskService.getPlanTasks(route.paramMap.get('id')),
  ]).pipe(
    catchError(error => {
      // Log the error
      console.error(error);

      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');

      // Navigate to there
      router.navigateByUrl(parentUrl);

      // Throw an error
      return throwError(() => new Error(error));
    })
  );
};
