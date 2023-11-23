import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ContactsDetailsComponent } from '../details/details.component';

export const ContactsGuardCanDeactivate: CanDeactivateFn<unknown> = (
  component: ContactsDetailsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  // Get the next route
  let nextRoute: ActivatedRouteSnapshot = nextState.root;
  while (nextRoute.firstChild) {
    nextRoute = nextRoute.firstChild;
  }

  // If the next state doesn't contain '/contacts'
  // it means we are navigating away from the
  // contacts app
  if (!nextState.url.includes('/contacts')) {
    // Let it navigate
    return true;
  }

  // If we are navigating to another contact...
  if (nextRoute.paramMap.get('id')) {
    // Just navigate
    return true;
  }

  // Otherwise, close the drawer first, and then navigate
  return component.closeDrawer().then(() => true);
};
