import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardNavStatus } from '../../../enums/dashboard-nav-status.enum';

@Component({
  selector: 'exam-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: [ './dashboard-header.component.sass' ],
})
export class DashboardHeaderComponent implements OnInit {
  DashboardNavStatus = DashboardNavStatus;

  @Output()
  clickMenuButton: EventEmitter<DashboardNavStatus> = new EventEmitter<DashboardNavStatus>();
  @Output()
  logout: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onClickMenuButton(dashboardNavStatus: DashboardNavStatus) {
    this.clickMenuButton.emit(dashboardNavStatus);
  }

  onLogout() {
    this.logout.emit();
  }
}
