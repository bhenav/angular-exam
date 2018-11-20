import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseState } from '../models/base-state.model';

export abstract class BaseService<State extends BaseState> {

  // region Source
  public API_PREFIX = '/api';
  public abstract path: string;
  // endregion

  // region State
  public state$: BehaviorSubject<State> = new BehaviorSubject<State>(null);
  public initialState: State;
  // endregion

  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(
    public readonly http: HttpClient,
    initialState: State,
  ) {
    this.initialState = initialState;
    this.updateState();
  }

  post<T>(model: T, options = { headers: this.headers }): Observable<T> {
    return this.http.post<T>(this.path, JSON.stringify(model), options);
  }

  all<T>(options = { headers: this.headers }): Observable<T[]> {
    return this.http.get<T[]>(`${this.path}`, options);
  }

  del<T>(id: string, options = { headers: this.headers }): Observable<T> {
    return this.http.delete<T>(`${this.path}/${id}`, options);
  }

  one<T>(id: string, options = { headers: this.headers }): Observable<T> {
    return this.http.get<T>(`${this.path}/${id}`, options);
  }

  put<T>(id: string, model: T, options = { headers: this.headers }): Observable<T> {
    return this.http.put<T>(`${this.path}/${id}`, JSON.stringify(model), options);
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

  updateState(state: State = this.initialState) {
    this.state$.next(_.assign({}, this.initialState, state) as State);
  }
}
