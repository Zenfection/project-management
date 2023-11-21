import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TasksFacade } from '@client/core-state';
import { Task } from '@client/shared/interfaces';

export const TodoResolver: ResolveFn<Task> = (route, state) => {
  const taskFacade = inject(TasksFacade);
  const router = inject(Router);

  taskFacade.selectTask(+route.paramMap.get('taskId'));

  return taskFacade.selectedTask$.pipe(
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
