import { BaseModel } from '../../../model/base.model';
import { Translation } from './translation';

export interface I18n extends BaseModel {
  code: string;
  translations: Translation[];
}

