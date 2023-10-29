import {
  ActivatedRouteSnapshot,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { PlanComponent } from './plan.component';
import { NgModule, inject } from '@angular/core';
import { catchError, combineLatest, throwError } from 'rxjs';
import { PlanService } from './plan.service';
import { PlanListComponent } from './list/list.component';
import { PlanDetailsComponent } from './details/details.component';
import { TasksDetailsComponent } from '../tasks/details/details.component';
import { TasksService } from '../tasks/tasks.service';
import { PlanTodoComponent } from './todo/todo.component';

/**
 * Course resolver
 *
 * @param route
 * @param state
 */
const planResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const planService = inject(PlanService);
  const router = inject(Router);

  return combineLatest([
    planService.getPlanById(route.paramMap.get('id')),
    planService.getPlanTasks(route.paramMap.get('id')),
  ]).pipe(
    catchError(error => {
      // Log the error
      console.error(error);

      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');

      // Navigate to there
      router.navigateByUrl(parentUrl);

      // Throw an error
      return throwError(error);
    })
  );
};

/**
 * Can deactivate tasks details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivatePlanTodosDetails = (
  component: PlanTodoComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  // Get the next route
  let nextRoute: ActivatedRouteSnapshot = nextState.root;
  while (nextRoute.firstChild) {
    nextRoute = nextRoute.firstChild;
  }

  // If the next state doesn't contain '/tasks'
  // it means we are navigating away from the
  // tasks app
  if (!nextState.url.includes(`/plan`)) {
    // Let it navigate
    return true;
  }

  // If we are navigating to another task...
  if (nextRoute.paramMap.get('taskId')) {
    // Just navigate
    return true;
  }

  // Otherwise, close the drawer first, and then navigate
  return component.closeDrawer().then(() => true);
};

const routes = [
  {
    path: '',
    component: PlanComponent,
    resolve: {
      categories: () => inject(PlanService).getCategories(),
    },
    children: [
      {
        path: '',
        // pathMatch: 'full',
        component: PlanListComponent,
        resolve: {
          courses: () => inject(PlanService).getPlans(),
        },
      },
      {
        path: ':id',
        component: PlanDetailsComponent,
        resolve: {
          course: planResolver,
        },
        children: [
          {
            path: ':taskId',
            component: PlanTodoComponent,
            canDeactivate: [canDeactivatePlanTodosDetails],
          },
        ],
      },
    ],
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [PlanComponent],
  exports: [PlanComponent],
})
export class PlanModule {}
