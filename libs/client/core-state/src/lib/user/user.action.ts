import { createAction, props } from '@ngrx/store';
import { User } from '@client/shared/interfaces';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>(),
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: { message: string } }>(),
);

export const updateUserInfo = createAction(
  '[User] Update User Info',
  props<{ user: Partial<User> }>(),
);

export const updateUserInfoSuccess = createAction(
  '[User] Update User Info Success',
  props<{ user: User }>(),
);

export const updateUserInfoFailure = createAction(
  '[User] Update User Info Failure',
  props<{ error: { message: string } }>(),
);

export const updateAvatar = createAction(
  '[User] Update Avatar',
  props<{ file: File }>(),
);

export const updateAvatarSuccess = createAction(
  '[User] Update Avatar Success',
  props<{ user: User }>(),
);

export const updateAvatarFailure = createAction(
  '[User] Update Avatar Failure',
  props<{ error: { message: string } }>(),
);
