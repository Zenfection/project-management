import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Contact } from '../contacts.types';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ContactsService } from '../contacts.service';

export const ContactResolver: ResolveFn<Contact> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const contactsService = inject(ContactsService);
  const router = inject(Router);

  return contactsService.getContactById(route.paramMap.get('id')).pipe(
    // Error here means the requested contact is not available
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
