import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { User } from '@client/shared/interfaces';
import * as UserActions from './user.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
  constructor(
    private _httpClient: HttpClient,
    private actions$: Actions,
    private _snackbar: MatSnackBar,
  ) {}

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this._httpClient.get<User>('api/common/user').pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) => {
            return of(UserActions.loadUserFailure({ error }));
          }),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserInfo),
      switchMap((action) =>
        this._httpClient.patch<User>('api/users/info', action.user),
      ),
      map((user) => {
        return UserActions.updateUserInfoSuccess({ user });
      }),
      tap(() => {
        this._snackbar.open('User updated successfully.', 'Close', {
          duration: 3000,
        });
      }),
      catchError((error) => {
        this._snackbar.open(
          `Failed to update user because: ${error.message}`,
          'Close',
          {
            duration: 3000,
          },
        );
        return of(UserActions.updateUserInfoFailure({ error }));
      }),
    );
  });

  updateAvatar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateAvatar),
      switchMap(({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return this._httpClient.post<User>('api/users/avatar', formData).pipe(
          map((user) => UserActions.updateAvatarSuccess({ user })),
          tap((user) => {
            console.log(user);
            this._snackbar.open('Upload avatar successfully.', 'Close', {
              duration: 3000,
            });
          }),
          catchError((error) => {
            this._snackbar.open(
              `Upload avatar failed because: ${error.message}`,
              'Close',
              {
                duration: 3000,
              },
            );
            return of(UserActions.updateAvatarFailure({ error }));
          }),
        );
      }),
    );
  });
}
