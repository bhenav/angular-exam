import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { IndexComponent } from './containers/index/index.component';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ DashboardGuard ],
    children: <Routes>[
      {
        path: '',
        redirectTo: 'index',
      },
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'index2',
        component: IndexComponent,
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DashboardRoutingModule {
}
