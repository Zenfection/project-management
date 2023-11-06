import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createSelector,
} from '@ngrx/store';
import * as fromPlans from './plans/plans.reducer';
import * as fromUser from './user/user.reducer';
import * as fromSetting from './setting/setting.reducer';

export interface AppState {
  plans: fromPlans.PlansState;
  user: fromUser.UserState;
  setting: fromSetting.SettingState;
}

export const selectAppState = (state: AppState) => state;

export const selectPlansState = createSelector(
  selectAppState,
  (state: AppState) => state.plans
);

export const selectUserState = createSelector(
  selectAppState,
  (state: AppState) => state.user
);

export const logger: MetaReducer<AppState> =
  (reducer: ActionReducer<AppState>) => (state, action) => {
    const result = reducer(state, action);
    console.log('state', state);
    console.log('action', action);
    console.log('result', result);
    return result;
  };

export const metaReducers: MetaReducer<AppState>[] = [logger];

export const reducers: ActionReducerMap<AppState> = {
  plans: fromPlans.plansReducer,
  user: fromUser.userReducer,
  setting: fromSetting.settingReducer,
};
