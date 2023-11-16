import { User } from '@client/shared/interfaces';
import * as UserActions from './user.action';
import { createReducer, on } from '@ngrx/store';

// 1. Define the shape of state
export interface UserState {
  user: User | null;
}

// 2. Define the initial state
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
  }),
);
