import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PlanTodoComponent } from './todo.component';

export const TodoGuardCanDeactivate: CanDeactivateFn<unknown> = (
  component: PlanTodoComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  // get the next route
  let nextRoute: ActivatedRouteSnapshot = nextState.root;
  while (nextRoute.firstChild) {
    nextRoute = nextRoute.firstChild;
  }

  // if the next state doesn't contain '/plan'
  // it means we are navigating away from the
  // plan app
  if (!nextState.url.includes('/plan')) {
    // let it navigate
    return true;
  }

  // if we are navigating to another task...
  if (nextRoute.paramMap.get('taskId')) {
    // just navigate
    return true;
  }

  // otherwise, close the drawer first, and then navigate
  return component.closeDrawer().then(() => true);
};
