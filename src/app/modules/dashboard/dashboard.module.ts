import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { DashboardNavComponent } from './components/dashboard/dashboard-nav/dashboard-nav.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { IndexComponent } from './containers/index/index.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardNavToggleDirective } from './directives/dashboard-nav-toggle/dashboard-nav-toggle.directive';

@NgModule({
  declarations: [ IndexComponent, DashboardComponent, DashboardHeaderComponent, DashboardNavComponent, DashboardNavToggleDirective ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    TranslateModule,
    NgSelectModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class DashboardModule {
}
