import { loadUserSuccess, updateAvatar, updateUser } from './user.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/core/user/user.types';
import * as fromUser from './user.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$: Observable<User> = this.store.select(fromUser.selectUser);

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
