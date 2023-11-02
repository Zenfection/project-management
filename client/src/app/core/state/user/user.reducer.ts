import { User } from 'app/core/user/user.types';
import * as UserActions from './user.action';

// 1. Define the shape of state
export interface UserState {
  user: User;
}

// 2. Define the initial state
export const initialState: UserState = {
  user: null,
};

// 3. Define the reducer function
export function userReducer(
  state: UserState = initialState,
  action
): UserState {
  switch (action.type) {
    case UserActions.loadUserSuccess.type:
      return {
        ...state,
        user: action.user,
      };
    case UserActions.selectUser.type:
      return {
        ...state,
        user: state.user.id === action.id ? state.user : null,
      };
    case UserActions.updateUserSuccess.type:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
