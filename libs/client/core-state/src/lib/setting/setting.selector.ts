import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingState } from './setting.reducer';

export const selectSettingState =
  createFeatureSelector<SettingState>('setting');

export const selectSetting = createSelector(
  selectSettingState,
  (settingState: SettingState) => settingState.setting,
);
