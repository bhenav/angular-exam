import { BaseState } from '../../../models/base-state.model';
import { Language } from './language.model';

export interface LanguageState extends BaseState {
  all: Language[];
  currentLanguage: string;
}
