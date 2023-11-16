import { loadSettingSuccess, updateSetting } from './setting.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Setting } from '@client/shared/interfaces';
import { Observable } from 'rxjs';
import { selectSetting } from './setting.selector';
@Injectable({
  providedIn: 'root',
})
export class SettingFacade {
  setting$: Observable<Setting> = this.store.select(selectSetting);
  constructor(private readonly store: Store) {}

  loadSettingSuccess(setting: Setting): void {
    this.store.dispatch(loadSettingSuccess({ setting }));
  }

  updateSetting(setting: Partial<Setting>): void {
    this.store.dispatch(updateSetting({ setting }));
  }
}
