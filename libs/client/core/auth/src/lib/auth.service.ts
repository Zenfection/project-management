import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingFacade, UserFacade } from '@client/core-state';
import { Setting, User } from '@client/shared/interfaces';
import { UserService } from '@client/shared/services';
import {
  Observable,
  catchError,
  exhaustMap,
  of,
  retry,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthUtils } from './auth.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  _authenticated = false;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _userService: UserService,
    private readonly _userFacade: UserFacade,
    private readonly _settingFacade: SettingFacade,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */

  set accessToken(token: string) {
    localStorage.removeItem('accessToken');
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  set refreshToken(token: string) {
    localStorage.removeItem('refreshToken');
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError(() => Error('User is already logged in.'));
    }

    return this._httpClient
      .post('api/authentication/sign-in', credentials)
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.accessToken;
          this.refreshToken = response.refreshToken;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          const userInfo: User = {
            id: response.id,
            info: response.info,
            roles: response.roles,
            department: response.department,
          };

          this._userService.user = userInfo;
          this._userFacade.loadUserSuccess(userInfo);

          // Store the setting on the setting service
          const settingInfo: Setting = {
            id: response.id,
            language: response.setting.language,
            theme: response.setting.theme,
            scheme: response.setting.scheme,
            layout: response.setting.layout,
          };
          this._settingFacade.loadSettingSuccess(settingInfo);

          // Return a new observable with the response
          return of(response);
        }),
      );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._httpClient
      .post('api/authentication/sign-in-with-token', {
        accessToken: this.accessToken,
      })
      .pipe(
        retry(3),
        catchError(() => of(false)),
        switchMap((response: any) => {
          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          const userInfo: User = {
            id: response.id,
            info: response.info,
            roles: response.roles,
            department: response.department,
          };
          this._userService.user = userInfo;
          this._userFacade.loadUserSuccess(userInfo);

          // Store the setting on the setting service
          const settingInfo: Setting = {
            id: response.id,
            language: response.setting.language,
            theme: response.setting.theme,
            scheme: response.setting.scheme,
            layout: response.setting.layout,
          };
          this._settingFacade.loadSettingSuccess(settingInfo);

          // Return true
          return of(true);
        }),
      );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      if (AuthUtils.isTokenExpired(this.accessToken) && this.refreshToken) {
        return this.refreshTokenWhenExpired().pipe(
          exhaustMap((response) => {
            this.accessToken = response.accessToken;
            this.refreshToken = response.refreshToken;

            return of(true);
          }),
          catchError(() => of(false)),
        );
      }
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return this.refreshTokenWhenExpired().pipe(
        exhaustMap((response) => {
          this.accessToken = response.accessToken;
          this.refreshToken = response.refreshToken;

          return this.signInUsingToken();
        }),
        catchError(() => of(false)),
      );
    } else {
      return this.signInUsingToken();
    }
  }

  refreshTokenWhenExpired(): Observable<any> {
    return this._httpClient.post('api/authentication/refresh-token', {
      refreshToken: this.refreshToken,
    });
  }
}
