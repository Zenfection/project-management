import { createReducer, on } from '@ngrx/store';
import { Setting } from 'app/core/setting/setting.types';
import * as SettingActions from './setting.action';

// 1. Define the state interface
export interface SettingState {
  setting: Setting;
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
  })
);

// 4. Define the selectors
export const selectSettingState = (state: { setting: SettingState }) =>
  state.setting;

export const selectSetting = (state: { setting: SettingState }) =>
  state.setting.setting;
