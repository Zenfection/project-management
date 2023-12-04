import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.user,
);

export const selectIsAdmin = createSelector(selectUser, (user) => {
  const roles = user.roles.map((role) => role.name);
  return roles.includes('TRUONG_KHOA') || roles.includes('THU_KY_KHOA')
    ? true
    : false;
});
