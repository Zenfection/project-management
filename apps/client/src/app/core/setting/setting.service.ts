import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Setting } from '../models/setting/setting.types';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private _setting: ReplaySubject<Setting> = new ReplaySubject<Setting>(1);

  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * ? Setter & getter for user
   */
  set setting(value: Setting) {
    // Store the value
    this._setting.next(value);
  }

  get setting$(): Observable<Setting> {
    return this._setting.asObservable();
  }

  get(): Observable<Setting> {
    return this._httpClient.get<Setting>('api/users/setting').pipe(
      tap(user => {
        this._setting.next(user);
      })
    );
  }

  update(setting: Partial<Setting>): Observable<any> {
    return this._httpClient.patch<Setting>('api/users/setting', setting).pipe(
      map(response => {
        this._setting.next(response);
      })
    );
  }
}
