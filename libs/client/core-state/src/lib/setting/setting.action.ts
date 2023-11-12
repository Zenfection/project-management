import { createAction, props } from '@ngrx/store';
import { Setting } from '@client/shared/interfaces';

export const loadSetting = createAction('[Setting] Load Setting');

export const loadSettingSuccess = createAction(
  '[Setting] Load Setting Success',
  props<{ setting: Setting }>()
);

export const loadSettingFailure = createAction(
  '[Setting] Load Setting Failure',
  props<{ error: any }>()
);

export const updateSetting = createAction(
  '[Setting] Update Setting',
  props<{ setting: Partial<Setting> }>()
);

export const updateSettingSuccess = createAction(
  '[Setting] Update Setting Success',
  props<{ setting: Setting }>()
);

export const updateSettingFailure = createAction(
  '[Setting] Update Setting Failure',
  props<{ error: any }>()
);
