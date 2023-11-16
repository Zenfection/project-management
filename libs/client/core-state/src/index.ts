import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromPlans from './lib/plans/plans.reducer';
import * as fromUser from './lib/user/user.reducer';
import * as fromSetting from './lib/setting/setting.reducer';

export * from './lib/core-state.module';

// Facades
import { SettingFacade } from './lib/setting/setting.facade';
import { UserFacade } from './lib/user/user.facade';
import { PlansFacade } from './lib/plans/plans.facade';

export { SettingFacade, UserFacade, PlansFacade };

export interface AppState {
  plans: fromPlans.PlansState;
  user: fromUser.UserState;
  setting: fromSetting.SettingState;
}

export const selectAppState = (state: AppState) => state;

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
