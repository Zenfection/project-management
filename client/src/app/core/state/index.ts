import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createSelector,
} from '@ngrx/store';
import * as fromPlans from './plans/plans.reducer';
import * as fromUser from './user/user.reducer';

// Update the shape of the entire application state
export interface AppState {
  plans: fromPlans.PlansState;
  user: fromUser.UserState;
}

// Get Complete State
export const selectAppState = (state: AppState) => state;

// Get Plans State
export const selectPlansState = createSelector(
  selectAppState,
  (state: AppState) => state.plans
);

// Get User State
export const selectUserState = createSelector(
  selectAppState,
  (state: AppState) => state.user
);

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.log('state', state);
    console.log('action', action);
    console.log('result', result);
    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = [logger]; // add additional meta-reducers in this array

// Register the reducers
export const reducers: ActionReducerMap<AppState> = {
  plans: fromPlans.plansReducer,
  user: fromUser.userReducer,
};
