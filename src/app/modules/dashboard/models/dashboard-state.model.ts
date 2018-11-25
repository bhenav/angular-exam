import { BaseState } from '../../../models/base-state.model';
import { DashboardNavStatus } from '../enums/dashboard-nav-status.enum';

export interface DashboardState extends BaseState {
  navStatus: DashboardNavStatus;
}
