import { BaseState } from '../../../models/base-state.model';
import { User } from './user.model';

export interface AuthState extends BaseState {
  user: User;
}
