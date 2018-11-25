import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../components/base.component';
import { BaseService } from '../../../../services/base.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardNavStatus } from '../../enums/dashboard-nav-status.enum';
import { DashboardNav } from '../../models/dashboard-nav.model';
import { DashboardState } from '../../models/dashboard-state.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'exam-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.sass' ],
})
export class DashboardComponent implements OnInit, BaseComponent<DashboardState, DashboardService> {
  DashboardNavStatus = DashboardNavStatus;
  navs: DashboardNav[] = [];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.getNav();
  }

  getNav(): void {
    this.service().getNav().subscribe(navs => this.navs = navs);
  }

  onClickNav(item: DashboardNav) {
    if (item && item.children && this.state().navStatus === DashboardNavStatus.CLOSE) {
      this.service().updateDashboardNavStatus(DashboardNavStatus.LEFT);
    }
  }

  onClickMenuButton(dashboardNavStatus: DashboardNavStatus) {
    if (dashboardNavStatus !== this.state().navStatus) {
      this.service().updateDashboardNavStatus(dashboardNavStatus);
    } else {
      this.service().updateDashboardNavStatus(DashboardNavStatus.CLOSE);
    }
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.authService.redirectLogin();
      BaseService.resetAllState();
    });
  }

  state(): DashboardState {
    return this.service().state$.value;
  }

  service(): DashboardService {
    return this.dashboardService;
  }
}
