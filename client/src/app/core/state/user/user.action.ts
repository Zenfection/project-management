import { createAction, props } from '@ngrx/store';
import { User } from 'app/core/user/user.types';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const selectUser = createAction(
  '[User] Select User',
  props<{ id: string }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);
