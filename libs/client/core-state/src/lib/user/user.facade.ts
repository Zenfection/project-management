import { loadUserSuccess, updateAvatar, updateUserInfo } from './user.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@client/shared/interfaces';
import { Observable } from 'rxjs';
import { selectIsAdmin, selectUser } from './user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$: Observable<User> = this.store.select(selectUser);
  isAdmin$: Observable<boolean> = this.store.select(selectIsAdmin);

  constructor(private readonly store: Store) {}

  loadUserSuccess(user: User): void {
    this.store.dispatch(loadUserSuccess({ user }));
  }

  updateUserInfo(user: Partial<User>): void {
    this.store.dispatch(updateUserInfo({ user }));
  }

  updateAvatar(file: File): void {
    this.store.dispatch(updateAvatar({ file }));
  }
}
