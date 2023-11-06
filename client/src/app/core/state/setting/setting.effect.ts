import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Setting } from 'app/core/setting/setting.types';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadSettingSuccess } from './setting.action';
import * as SettingActions from './setting.action';

@Injectable()
export class SettingEffects {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly actions$: Actions
  ) {}

  loadSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.loadSetting),
      mergeMap(() =>
        this._httpClient.get<Setting>('api/users/setting').pipe(
          map(setting => loadSettingSuccess({ setting })),
          catchError(error => {
            console.error(error);
            return of(SettingActions.loadSettingFailure({ error }));
          })
        )
      )
    );
  });

  updateSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.updateSetting),
      mergeMap(action =>
        this._httpClient.patch<Setting>('api/users/setting', action.setting)
      ),
      map(setting => SettingActions.updateSettingSuccess({ setting })),
      catchError(error => {
        console.error(error);
        return of(SettingActions.updateSettingFailure({ error }));
      })
    );
  });
}
