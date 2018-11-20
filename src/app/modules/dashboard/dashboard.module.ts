import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { IndexComponent } from './containers/index/index.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [ IndexComponent, DashboardComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {
}
