import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let newReq = req;

    if (
      this.authService.accessToken &&
      !AuthUtils.isTokenExpired(this.authService.accessToken)
    ) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.authService.accessToken,
        ),
      });
    }

    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (
            this.authService.refreshToken &&
            !AuthUtils.isTokenExpired(this.authService.refreshToken)
          ) {
            return this.authService.refreshTokenWhenExpired().pipe(
              switchMap(() => {
                // Retry the failed request with the new access token
                newReq = newReq = req.clone({
                  headers: req.headers.set(
                    'Authorization',
                    'Bearer ' + this.authService.accessToken,
                  ),
                });
                return next.handle(newReq);
              }),
              catchError((error) => {
                this.authService.signOut();
                location.reload();
                return throwError(() => new Error(error));
              }),
            );
          } else {
            this.authService.signOut();
            location.reload();
          }
        }
        return throwError(() => new Error(error.message));
      }),
    );

    // return next.handle(newReq).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 401) {
    //       this.authService.signOut();
    //       location.reload();
    //     }
    //     return throwError(() => new Error(error.message));
    //   }),
    // );
  }
}
