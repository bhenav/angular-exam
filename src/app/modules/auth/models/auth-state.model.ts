import { BaseState } from '../../../models/base-state.model';

export interface AuthState extends BaseState {
  accessToken: string;
  refreshToken: string;
}
