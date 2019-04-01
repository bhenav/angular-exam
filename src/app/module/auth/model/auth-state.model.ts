import { BaseState } from '../../../model/base-state.model';

export interface AuthState extends BaseState {
  accessToken: string;
  refreshToken: string;
  message: string;
}
