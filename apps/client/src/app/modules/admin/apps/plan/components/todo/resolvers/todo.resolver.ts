import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { TasksFacade } from '@client/core-state';
import { Task } from '@client/shared/interfaces';
import { catchError, throwError } from 'rxjs';

export const TodoResolver: ResolveFn<Task> = (route, state) => {
  const tasksFacade = inject(TasksFacade);
  const router = inject(Router);

  tasksFacade.selectTask(+route.paramMap.get('taskId'));

  return tasksFacade.selectedTask$.pipe(
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
