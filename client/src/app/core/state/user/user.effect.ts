import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { User } from 'app/core/user/user.types';
import * as UserActions from './user.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private _httpClient: HttpClient,
    private actions$: Actions
  ) {}

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(() =>
        this._httpClient.get<User>('api/common/user').pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => {
            console.error(error);
            return of(UserActions.loadUserFailure({ error }));
          })
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this._httpClient.patch<User>('api/users/info', action.user)
      ),
      map(user => UserActions.updateUserSuccess({ user })),
      catchError(error => {
        console.error(error);
        return of(UserActions.updateUserFailure({ error }));
      })
    );
  });

  updateAvatar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateAvatar),
      mergeMap(({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return this._httpClient.post<User>('api/users/avatar', formData).pipe(
          map(user => UserActions.updateAvatarSuccess({ user })),
          catchError(error => {
            console.error(error);
            return of(UserActions.updateAvatarFailure({ error }));
          })
        );
      })
    );
  });
}
