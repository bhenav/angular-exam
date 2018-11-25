import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from '../../../services/base.service';
import { DashboardNavStatus } from '../enums/dashboard-nav-status.enum';
import { DashboardNav } from '../models/dashboard-nav.model';
import { DashboardState } from '../models/dashboard-state.model';


const initialState: DashboardState = <DashboardState>{
  navStatus: DashboardNavStatus.CLOSE,
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService<DashboardState> {
  path = `${ this.API_PREFIX }/dashboard`;

  constructor(
    public readonly http: HttpClient,
    public readonly router: Router,
  ) {
    super(http, initialState);
  }


  redirectIndex() {
    this.router.navigate([ 'dashboard', 'index' ]);
  }


  updateDashboardNavStatus(dashboardNavStatus: DashboardNavStatus) {
    this.dispatch(<DashboardState>{
      navStatus: dashboardNavStatus,
    });
  }

  getNav(): Observable<DashboardNav[]> {
    return this.http.get<DashboardNav[]>(`${ this.path }/navs`);
  }
}

