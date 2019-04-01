import { BaseModel } from '../../../model/base.model';
import { Language } from '../../language/model/language.model';

export interface Translation extends BaseModel {
  language: Language;
  message: string;
}
