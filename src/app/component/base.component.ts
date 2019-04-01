import { BaseState } from '../model/base-state.model';
import { BaseService } from '../service/base/base.service';

export interface BaseComponent<State extends BaseState, Service extends BaseService<State>> {
  state(): State;

  service(): Service;
}
