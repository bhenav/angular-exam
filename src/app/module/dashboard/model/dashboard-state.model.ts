import { BaseState } from '../../../model/base-state.model';
import { DashboardNavStatus } from '../enum/dashboard-nav-status.enum';

export interface DashboardState extends BaseState {
  navStatus: DashboardNavStatus;
}
