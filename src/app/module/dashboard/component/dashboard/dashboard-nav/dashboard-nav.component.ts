import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardNavToggleDirective } from '../../../directive/dashboard-nav-toggle/dashboard-nav-toggle.directive';
import { DashboardNavStatus } from '../../../enum/dashboard-nav-status.enum';
import { DashboardNav } from '../../../model/dashboard-nav.model';

@Component({
  selector: 'exam-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: [ './dashboard-nav.component.sass' ],
  animations: [
    trigger('subItems', [
      state('void', style({ opacity: '0', height: '0' })),
      state('*', style({ opacity: '1', height: '*' })),
      transition('* => *', animate('200ms ease-in-out')),
    ]),
  ],
})
export class DashboardNavComponent {
  DashboardNavStatus = DashboardNavStatus;
  @Input() navs: DashboardNav[] = [];
  @Input() navStatus: DashboardNavStatus;
  @Output() clickNav: EventEmitter<DashboardNav> = new EventEmitter<DashboardNav>();

  onClickNav(item: DashboardNav, parent: DashboardNavToggleDirective) {
    if (
      this.navStatus !== DashboardNavStatus.CLOSE
      && this.navStatus
    ) {
      parent.toggle();
    }
    this.clickNav.emit(item);
  }
}
