import { BaseModel } from '../../../models/base.model';
import { Language } from '../../language/models/language.model';

export interface Translation extends BaseModel {
  language: Language;
  message: string;
}
