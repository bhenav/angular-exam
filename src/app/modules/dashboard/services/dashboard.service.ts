import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../../services/base.service';
import { DashboardState } from '../models/dashboard-state.model';

const initialState: DashboardState = <DashboardState>{};

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService<DashboardState> {
  path = `${this.API_PREFIX}/dashboard`;

  constructor(
    public readonly http: HttpClient,
    public readonly router: Router,
  ) {
    super(http, initialState);
  }

  redirectIndex() {
    this.router.navigate([ 'dashboard', 'index' ]);
  }
}
