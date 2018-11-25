import { BaseState } from '../models/base-state.model';
import { BaseService } from '../services/base.service';

export interface BaseComponent<State extends BaseState, Service extends BaseService<State>> {
  state(): State;
  service(): Service;
}
