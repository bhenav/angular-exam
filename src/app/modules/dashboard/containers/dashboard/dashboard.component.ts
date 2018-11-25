import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../components/base.component';
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
  navs: DashboardNav[] = [
    <DashboardNav>{ id: 11, title: 'test 1' },
    <DashboardNav>{ id: 12, title: 'test 2', path: '/' },
    <DashboardNav>{
      id: 13,
      title: 'test 3',
      icon: 'shopping-cart',
      children: [
        <DashboardNav>{ id: 31, title: 'test sub 1' },
        <DashboardNav>{ id: 32, title: 'test sub 2' },
        <DashboardNav>{ id: 33, title: 'test sub 3' },
      ],
    },
    <DashboardNav>{
      id: 14,
      title: 'test 4',
      children: [
        <DashboardNav>{ id: 41, title: 'test sub 1' },
        <DashboardNav>{ id: 42, title: 'test sub 2' },
        <DashboardNav>{ id: 43, title: 'test sub 3' },
      ],
    },
  ];

  constructor(
    private readonly dashboardService: DashboardService,
  ) {
  }

  ngOnInit() {
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

  state(): DashboardState {
    return this.dashboardService.state$.value;
  }

  service(): DashboardService {
    return this.dashboardService;
  }
}
