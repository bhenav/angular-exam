import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { BlockContainerComponent } from './component/block-container/block-container.component';
import { DashboardHeaderComponent } from './component/dashboard/dashboard-header/dashboard-header.component';
import { DashboardNavComponent } from './component/dashboard/dashboard-nav/dashboard-nav.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { IndexComponent } from './container/index/index.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardNavToggleDirective } from './directive/dashboard-nav-toggle/dashboard-nav-toggle.directive';


@NgModule({
  declarations: [
    BlockContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    BlockContainerComponent,
  ],
})
export class DashboardModuleExports {
}

@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    DashboardNavToggleDirective,
  ],
  imports: [
    DashboardRoutingModule,
    DashboardModuleExports,
  ],
})
export class DashboardModule {
}
