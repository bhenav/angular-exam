import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BaseState } from '../models/base-state.model';

const classes: any[] = [];

export interface BaseServiceOptions {
  localStorage?: boolean;
  reset: boolean;
}

export abstract class BaseService<State extends BaseState> implements OnDestroy {
  // region Source
  public API_PREFIX = '/api';
  public abstract path: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // #endregion

  // region State
  public state$: BehaviorSubject<State> = new BehaviorSubject<State>(null);
  public initialState: State;
  stateSubscribe: Subscription;
  // #endregion

  SERVICE_ID: number;
  options: BaseServiceOptions;

  protected constructor(
    public readonly http: HttpClient,
    initialState: State,
    options: BaseServiceOptions = <BaseServiceOptions>{
      localStorage: true,
      reset: true,
    },
  ) {
    this.initialState = initialState;
    this.options = options;
    if (options.localStorage) {
      this.dispatch(this.getStateInLocalStorage() || this.initialState);
      this.stateSubscribe = this.state$.subscribe(state => this.setStateInLocalStorage(state));
    } else {
      this.dispatch();
    }
    classes.push(this);
    this.SERVICE_ID = Math.round(Math.random() * 23535634534);
  }

  public get className(): string[] {
    const obj = Object.getPrototypeOf(this);
    return obj.constructor.name;
  }

  static resetAllState() {
    classes.forEach(item => {
      if (item.options.reset !== false) {
        item.dispatch(item.initialState);
      }
    });
  }

  post<T>(model: T, options = { headers: this.headers }): Observable<T> {
    return this.http.post<T>(this.path, JSON.stringify(model), options);
  }

  all<T>(options = { headers: this.headers }): Observable<T[]> {
    return this.http.get<T[]>(`${ this.path }/all`, options);
  }

  del<T>(id: string, options = { headers: this.headers }): Observable<T> {
    return this.http.delete<T>(`${ this.path }/${ id }`, options);
  }

  one<T>(id: string, options = { headers: this.headers }): Observable<T> {
    return this.http.get<T>(`${ this.path }/${ id }`, options);
  }

  put<T>(id: string, model: T, options = { headers: this.headers }): Observable<T> {
    return this.http.put<T>(`${ this.path }/${ id }`, JSON.stringify(model), options);
  }

  pureGet<T>(url: string, options = { headers: this.headers }): Observable<T> {
    return this.http.get<T>(url, options);
  }

  pureAll<T>(url: string, options = { headers: this.headers }): Observable<T[]> {
    return this.http.get<T[]>(url, options);
  }

  purePut<T>(url: string, model: T, options = { headers: this.headers }): Observable<T> {
    return this.http.put<T>(url, (model != null) ? JSON.stringify(model) : null, options);
  }

  purePost<T>(url: string, model: T, options = { headers: this.headers }): Observable<T> {
    return this.http.post<T>(url, (model != null) ? JSON.stringify(model) : null, options);
  }

  pureDel<T>(url: string, options = { headers: this.headers }): Observable<T> {
    return this.http.delete<T>(url, options);
  }

  dispatch(state: State = this.initialState) {
    this.state$.next(_.assign({}, this.state$.value, state) as State);
  }

  setStateInLocalStorage(state): boolean {
    localStorage.setItem(this.className.toString(), btoa(JSON.stringify(state)));
    return true;
  }

  getStateInLocalStorage(): State | undefined {
    if (!localStorage.getItem(this.className.toString())) {
      return undefined;
    }
    return JSON.parse(atob(localStorage.getItem(this.className.toString()))) as State;
  }

  removeStateInLocalStorage(): boolean {
    localStorage.removeItem(this.className.toString());
    return true;
  }

  ngOnDestroy(): void {
    this.stateSubscribe.unsubscribe();
    classes.forEach((item, index) => {
      if (this.SERVICE_ID !== item.SERVICE_ID) {
        classes.splice(index, 1);
      }
    });
    this.onDestroy();
  }

  onDestroy?(): void;
}
