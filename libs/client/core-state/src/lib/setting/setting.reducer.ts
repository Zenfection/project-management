import { createReducer, on } from '@ngrx/store';
import { Setting } from '@client/shared/interfaces';
import * as SettingActions from './setting.action';

// 1. Define the state interface
export interface SettingState {
  setting: Setting | null;
}

// 2. Define the initial state
export const initialState: SettingState = {
  setting: null,
};

// 3. Define the reducer function
export const settingReducer = createReducer<SettingState>(
  initialState,
  on(SettingActions.loadSettingSuccess, (state, action): SettingState => {
    return {
      ...state,
      setting: action.setting,
    };
  }),
  on(SettingActions.updateSettingSuccess, (state, action): SettingState => {
    return {
      ...state,
      setting: action.setting,
    };
  }),
);
