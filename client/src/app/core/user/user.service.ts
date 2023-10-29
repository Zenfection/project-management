import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import {
  catchError,
  map,
  Observable,
  ReplaySubject,
  tap,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private updateUser: User;

  constructor(private _httpClient: HttpClient) {}

  /**
   * ? Setter & getter for user
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  get(): Observable<User> {
    return this._httpClient.get<User>('api/common/user').pipe(
      tap(user => {
        this._user.next(user);
      })
    );
  }

  update(data: Partial<User>): Observable<any> {
    return this._httpClient
      .patch<User>('api/users/info', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken') ?? '',
        },
      })
      .pipe(
        map(response => {
          this._user.subscribe(user => {
            this.updateUser = { ...user, ...response };
          }).unsubscribe();
          this._user.next(this.updateUser);
        }),
        catchError((error: any) => new Observable<any>(error))
      );
  }

  updateAvatar(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);

    return this._httpClient
      .post<User>('api/users/avatar', formData , {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken') ?? '',
        },
      })
      .pipe(
        map(response => {
          this._user.subscribe(user => {
            this.updateUser = { ...user, ...response };
          }).unsubscribe();
          this._user.next(this.updateUser);
        }),
        catchError((error: any) => new Observable<any>(error))
      );
  }
}
