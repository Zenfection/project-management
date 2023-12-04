import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  PreloadAllModules,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { TasksDetailsComponent } from './details/details.component';
import { TasksListComponent } from './list/list.component';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { catchError, throwError } from 'rxjs';
import { TasksDetailsCanDeactivate } from './guards/task-details.guard';

/**
 * Task resolver
 *
 * @param route
 * @param state
 */
const taskResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
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

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    resolve: {
      tags: () => inject(TasksService).getTags(),
    },
    children: [
      {
        path: '',
        component: TasksListComponent,
        resolve: {
          tasks: () => inject(TasksService).getTasks(),
          alltasks: () => inject(TasksService).getAllTasks(),
        },
        children: [
          {
            path: ':id',
            component: TasksDetailsComponent,
            resolve: {
              task: taskResolver,
            },
            canDeactivate: [TasksDetailsCanDeactivate],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
  ],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
