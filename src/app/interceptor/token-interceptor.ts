import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, exhaustMap } from 'rxjs/operators';
import { AuthState } from '../module/auth/model/auth-state.model';
import { AuthService } from '../module/auth/service/auth.service';

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
          const authState = this.authService.state$.value;
          if (error.status === 401 && !!authState.refreshToken) {
            this.authService.dispatch(<AuthState>{
              accessToken: null,
            });
            return this.authService.refreshToken().pipe(
              exhaustMap(() => {
                return next.handle(this.getRequestClone(request)).pipe(
                  catchError(err => {
                    this.authService.redirectLogin();
                    return throwError(err);
                  }),
                );
              }),
              catchError(err => {
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
    const authState = this.authService.state$.value;
    if (authState.accessToken) {
      updateOptions.setHeaders = {
        Authorization: `Bearer ${ authState.accessToken }`,
      };
    }
    return request.clone(updateOptions);
  }

}
