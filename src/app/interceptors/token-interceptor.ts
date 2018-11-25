import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.getRequestClone(request)).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && !!this.authService.getRefreshToken()) {
            this.authService.removeAccessToken();
            return this.authService.resfreshToken().pipe(
              exhaustMap(() => {
                return next.handle(this.getRequestClone(request)).pipe(
                  catchError(err => {
                    this.authService.redirectLogin();
                    return throwError(err);
                  }),
                );
              }),
              catchError(err => {
                this.authService.removeRefreshToken();
                this.authService.redirectLogin();
                return throwError(err);
              }),
            );
          }
        }
        return throwError(error);
      }),
    );
  }

  getRequestClone(request: HttpRequest<any>) {
    const updateOptions: any = {};
    if (this.authService.getAccessToken()) {
      updateOptions.setHeaders = {
        Authorization: `Bearer ${ this.authService.getAccessToken() }`,
      };
    }
    return request.clone(updateOptions);
  }

}
