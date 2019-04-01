import { BaseState } from '../../../model/base-state.model';
import { I18n } from './i18n.model';

export interface I18nState extends BaseState {
  all: I18n[];
}
