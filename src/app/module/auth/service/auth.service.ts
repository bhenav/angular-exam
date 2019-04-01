import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from '../../../service/base/base.service';
import { AuthState } from '../model/auth-state.model';
import { ForgotPassword } from '../model/forgot-password.model';
import { Login } from '../model/login.model';
import { SignUp } from '../model/sign-up.model';
import { TokenResponse } from '../model/token-response.model';

const initialState: AuthState = <AuthState>{
  accessToken: null,
  refreshToken: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<AuthState> {
  path = `${ this.API }/authentication`;

  constructor(
    public readonly http: HttpClient,
    public readonly router: Router,
  ) {
    super(http, initialState);
  }

  login(model: Login, options = { headers: this.headers }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${ this.path }/login`, model, { ...options })
      .pipe(
        tap(tokenResponse => {
          this.dispatch(<AuthState>{
            refreshToken: tokenResponse.refreshToken,
            accessToken: tokenResponse.accessToken,
            message: 'login',
          });
        }),
      );
  }

  logout(options = { headers: this.headers }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${ this.path }/logout`, {}, { ...options })
      .pipe(
        tap(() => {
          this.dispatch(<AuthState>{
            refreshToken: null,
            accessToken: null,
          });
        }),
      );
  }

  signUp(model: SignUp, options = { headers: this.headers }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${ this.path }/sign-up`, model, { ...options })
      .pipe(
        tap(tokenResponse => {
          this.dispatch(<AuthState>{
            refreshToken: tokenResponse.refreshToken,
            accessToken: tokenResponse.accessToken,
          });
        }),
      );
  }

  forgotPassword(model: ForgotPassword, options = { headers: this.headers }): Observable<any> {
    return this.http.post<any>(`${ this.path }/forgot-password`, model, { ...options });
  }

  checkAuthentication(options = { headers: this.headers }): Observable<boolean> {
    return this.http.post<boolean>(`${ this.path }/check`, { ...options })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  refreshToken(refreshToken = this.state$.value.refreshToken, options = { headers: this.headers }): Observable<TokenResponse> {
    this.dispatch(<AuthState>{
      refreshToken: null,
    });
    if (!refreshToken) {
      return throwError('Not found Refresh Token');
    }
    return this.http.post<TokenResponse>(
      `${ this.path }/refresh`,
      { refreshToken: refreshToken },
      { ...options },
    ).pipe(
      tap(tokenResponse => {
        this.dispatch(<AuthState>{
          refreshToken: tokenResponse.refreshToken,
          accessToken: tokenResponse.accessToken,
        });
      }),
    );
  }

  // region Redirect
  redirectLogin() {
    this.router.navigate([ 'auth', 'login' ]);
  }

  redirectForgotPassword() {
    this.router.navigate([ 'auth', 'forgot-password' ]);
  }

  redirectSignUp() {
    this.router.navigate([ 'auth', 'sign-up' ]);
  }

  // endregion
}
