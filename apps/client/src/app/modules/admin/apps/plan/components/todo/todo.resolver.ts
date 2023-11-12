import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PlanTasks } from '../../models/plan-tasks.types';
import { PlanTasksService } from '../../services/plan-tasks.service';

export const TodoResolver: ResolveFn<PlanTasks> = (route, state) => {
  const planTasksService = inject(PlanTasksService);
  const router = inject(Router);

  return planTasksService.getPlanTaskById(route.paramMap.get('taskId')).pipe(
    // Error here means the requested task is not available
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
