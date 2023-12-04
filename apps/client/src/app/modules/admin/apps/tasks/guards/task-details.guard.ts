import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { TasksDetailsComponent } from '../details/details.component';

export const TasksDetailsCanDeactivate: CanDeactivateFn<unknown> = (
  component: TasksDetailsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  // Get the next route
  let nextRoute: ActivatedRouteSnapshot = nextState.root;
  while (nextRoute.firstChild) {
    nextRoute = nextRoute.firstChild;
  }

  // If the next state doesn't contain '/tasks'
  // it means we are navigating away from the
  // tasks app
  if (!nextState.url.includes('/tasks')) {
    // Let it navigate
    return true;
  }

  // If we are navigating to another task...
  if (nextRoute.paramMap.get('id')) {
    // Just navigate
    return true;
  }

  // Otherwise, close the drawer first, and then navigate
  return component.closeDrawer().then(() => true);
};
