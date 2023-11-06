import { User } from 'app/core/user/user.types';
import * as UserActions from './user.action';
// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

// 1. Define the shape of state
// export type UserState = EntityState<User>;
export interface UserState {
  user: User;
}

// 2. Define the initial state
// export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
// export const initialState: UserState = adapter.getInitialState();
export const initialState: UserState = {
  user: null,
};

// 3. Define the reducer function
export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.loadUserSuccess, (state, action): UserState => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(UserActions.updateUserSuccess, (state, action): UserState => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(UserActions.updateAvatarSuccess, (state, action): UserState => {
    return {
      ...state,
      user: action.user,
    };
  })
);

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.user
);
