import { BaseModel } from '../../../models/base.model';
import { Translation } from './translation';

export interface I18n extends BaseModel {
  code: string;
  translations: Translation[];
}

