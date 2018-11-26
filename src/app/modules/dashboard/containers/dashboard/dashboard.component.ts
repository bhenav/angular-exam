import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../components/base.component';
import { BaseService } from '../../../../services/base.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Language } from '../../../language/models/language.model';
import { LanguageState } from '../../../language/models/language.state';
import { LanguageService } from '../../../language/services/language.service';
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
    private readonly languageService: LanguageService,
  ) {
  }

  ngOnInit() {
    this.getNav();
    if (!this.languageState().all) {
      this.languageService.getLanguages().subscribe();
    }
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

  onChangeLanguage(language: Language) {
    this.languageService.onChangeLanguage(language);
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

  languageState(): LanguageState {
    return this.languageService.state$.value;
  }
}
