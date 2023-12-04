import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { UserFacade } from '@client/core-state';
import { map } from 'rxjs';

export const AdminAccessGuard: CanActivateFn | CanActivateChildFn = (
  route,
  state,
) => {
  const router: Router = inject(Router);
  const userFacade = inject(UserFacade);

  return userFacade.isAdmin$.pipe(
    map((isAdmin) => {
      if (isAdmin) {
        return true;
      }

      router.navigate(['/']);
      return false;
    }),
  );
};
