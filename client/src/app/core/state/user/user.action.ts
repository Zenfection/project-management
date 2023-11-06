import { createAction, props } from '@ngrx/store';
import { User } from 'app/core/user/user.types';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: Partial<User> }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const updateAvatar = createAction(
  '[User] Update Avatar',
  props<{ file: File }>()
);

export const updateAvatarSuccess = createAction(
  '[User] Update Avatar Success',
  props<{ user: User }>()
);

export const updateAvatarFailure = createAction(
  '[User] Update Avatar Failure',
  props<{ error: any }>()
);
