import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from '../../../services/base.service';
import { AuthState } from '../models/auth-state.model';
import { ForgotPassword } from '../models/forgot-password.model';
import { Login } from '../models/login.model';
import { SignUp } from '../models/sign-up.model';
import { TokenResponse } from '../models/token-response.model';

const initialState: AuthState = <AuthState>{};

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<AuthState> {
  path = `${this.API_PREFIX}/authentication`;

  constructor(
    public readonly http: HttpClient,
    public readonly router: Router,
  ) {
    super(http, initialState);
  }

  login(model: Login, options = { headers: this.headers }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.path}/login`, model, { ...options })
      .pipe(
        tap(tokenResponse => {
          this.setAccessToken(tokenResponse.accessToken);
          this.setRefreshToken(tokenResponse.refreshToken);
        }),
      );
  }

  signUp(model: SignUp, options = { headers: this.headers }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.path}/sign-up`, model, { ...options })
      .pipe(
        tap(tokenResponse => {
          this.setAccessToken(tokenResponse.accessToken);
          this.setRefreshToken(tokenResponse.refreshToken);
        }),
      );
  }

  forgotPassword(model: ForgotPassword, options = { headers: this.headers }): Observable<any> {
    return this.http.post<any>(`${this.path}/forgot-password`, model, { ...options });
  }

  checkAuthentication(options = { headers: this.headers }): Observable<boolean> {
    return this.http.post<boolean>(`${this.path}/check`, { ...options })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  resfreshToken(refreshToken = this.getRefreshToken(), options = { headers: this.headers }): Observable<TokenResponse> {
    this.removeRefreshToken();
    if (!refreshToken) {
      return throwError('Not found Refresh Token');
    }
    return this.http.post<TokenResponse>(
      `${this.path}/refresh`,
      { refreshToken: refreshToken },
      { ...options },
    ).pipe(
      tap(tokenResponse => {
        this.setAccessToken(tokenResponse.accessToken);
        this.setRefreshToken(tokenResponse.refreshToken);
      }),
    );
  }

  // region Token
  setAccessToken(token): boolean {
    localStorage.setItem('access_token', btoa(token));
    return true;
  }

  getAccessToken(): string {
    if (!localStorage.getItem('access_token')) {
      return undefined;
    }
    return atob(localStorage.getItem('access_token'));
  }

  removeAccessToken(): boolean {
    localStorage.removeItem('access_token');
    return true;
  }

  setRefreshToken(token): boolean {
    localStorage.setItem('refresh_token', btoa(token));
    return true;
  }

  getRefreshToken(): string {
    if (!localStorage.getItem('refresh_token')) {
      return undefined;
    }
    return atob(localStorage.getItem('refresh_token'));
  }

  removeRefreshToken(): boolean {
    localStorage.removeItem('refresh_token');
    return true;
  }

  // endregion

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
