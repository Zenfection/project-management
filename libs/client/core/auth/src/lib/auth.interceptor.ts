// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { throwError, Observable, BehaviorSubject } from 'rxjs';
// import { catchError, filter, switchMap, take } from 'rxjs/operators';
// import { AuthService } from './auth.service';

// const TOKEN_HEADER_KEY = 'Authorization';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
//     null,
//   );

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler,
//   ): Observable<HttpEvent<any>> {
//     req = req.clone({
//       headers: req.headers.set(
//         'Authorization',
//         'Bearer ' + this.authService.accessToken,
//       ),
//     });

//     return next.handle(req).pipe(
//       catchError((error) => {
//         if (error instanceof HttpErrorResponse && error.status === 401) {
//           return this.handle401Error(req, next);
//         }
//         return throwError(() => new Error(error.message));
//       }),
//     );
//   }

//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);

//       if (this.authService.refreshToken) {
//         return this.authService.refreshTokenWhenExpired().pipe(
//           switchMap((response) => {
//             this.isRefreshing = false;

//             this.authService.accessToken = response.accessToken;
//             this.authService.refreshToken = response.refreshToken;

//             this.refreshTokenSubject.next(this.authService.accessToken);

//             return next.handle(
//               this.addTokenHeader(request, this.authService.accessToken),
//             );
//           }),
//           catchError((error) => {
//             this.isRefreshing = false;

//             // this.authService.signOut();
//             // location.reload();

//             return throwError(() => new Error(error.message));
//           }),
//         );
//       }
//     }

//     return this.refreshTokenSubject.pipe(
//       filter((token) => token !== null),
//       take(1),
//       switchMap((token) => next.handle(this.addTokenHeader(request, token))),
//     );
//   }

//   private addTokenHeader(request: HttpRequest<any>, token: string) {
//     return request.clone({
//       headers: request.headers.set(TOKEN_HEADER_KEY, token),
//     });
//   }
// }

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
          this.authService.signOut();
          location.reload();
        }
        return throwError(() => new Error(error.message));
      }),
    );
  }
}
