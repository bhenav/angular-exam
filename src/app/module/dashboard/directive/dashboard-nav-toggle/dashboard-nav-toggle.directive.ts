import { Directive } from '@angular/core';

@Directive({
  exportAs: 'examDashboardNavToggle',
  selector: '[examDashboardNavToggle]',
})
export class DashboardNavToggleDirective {
  status = false;

  constructor() {
  }

  toggle() {
    this.status = !this.status;
  }
}
