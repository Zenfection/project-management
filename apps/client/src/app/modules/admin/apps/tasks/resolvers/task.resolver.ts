import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Router } from 'express';
import { catchError, throwError } from 'rxjs';
import { TasksService } from '../tasks.service';

export const TaskResolver: ResolveFn<any> = (route, state) => {
  const tasksService = inject(TasksService);
  const router = inject(Router);

  return tasksService.getTaskById(route.paramMap.get('id')).pipe(
    // Error here means the requested task is not available
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
