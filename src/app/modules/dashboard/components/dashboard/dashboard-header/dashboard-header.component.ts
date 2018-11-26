import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '../../../../language/models/language.model';
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

  @Output()
  changeLanguage: EventEmitter<Language> = new EventEmitter<Language>();

  @Input()
  languages: Language[];

  @Input()
  currentLanguage: string;

  constructor() {
  }

  ngOnInit() {
  }

  onChangeLanguage(language: Language) {
    this.changeLanguage.emit(language);
  }

  onClickMenuButton(dashboardNavStatus: DashboardNavStatus) {
    this.clickMenuButton.emit(dashboardNavStatus);
  }

  onLogout() {
    this.logout.emit();
  }
}
