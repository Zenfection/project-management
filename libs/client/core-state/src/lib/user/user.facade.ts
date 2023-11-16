import { loadUserSuccess, updateAvatar, updateUser } from './user.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@client/shared/interfaces';
import { Observable } from 'rxjs';
import { selectUser } from './user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$: Observable<User> = this.store.select(selectUser);

  constructor(private readonly store: Store) {}

  loadUserSuccess(user: User): void {
    this.store.dispatch(loadUserSuccess({ user }));
  }

  updateUser(user: Partial<User>): void {
    this.store.dispatch(updateUser({ user }));
  }

  updateAvatar(file: File): void {
    this.store.dispatch(updateAvatar({ file }));
  }
}
