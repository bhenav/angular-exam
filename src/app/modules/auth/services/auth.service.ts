import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from '../../../services/base.service';
import { AuthState } from '../models/auth-state.model';
import { ForgotPassword } from '../models/forgot-password.model';
import { LoginResponse } from '../models/login-response.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<AuthState> {
  path = `${this.API_PREFIX}/authentication`;
  public initialState: AuthState = <AuthState>{
    user: {},
  };

  constructor(
    public readonly http: HttpClient,
    public readonly router: Router,
  ) {
    super(http);
    this.updateState(this.initialState);
  }

  login(model: Login, options = { headers: this.headers }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.path}/login`, model, { ...options })
      .pipe(
        tap(loginResponse => this.setToken(loginResponse.token)),
      );
  }

  forgotPassword(model: ForgotPassword, options = { headers: this.headers }): Observable<any> {
    return this.http.post<any>(`${this.path}/forgot-password`, model, { ...options });
  }

  // region Token
  // noinspection JSMethodCanBeStatic
  setToken(token): boolean {
    localStorage.setItem('access_token', btoa(token));
    return true;
  }

  getToken(): string {
    return atob(localStorage.getItem('access_token'));
  }

  removeToken(): boolean {
    localStorage.removeItem('access_token');
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
