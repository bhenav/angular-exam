import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { IndexComponent } from './container/index/index.component';
import { DashboardGuard } from './guard/dashboard.guard';

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
