import { BaseModel } from '../../../model/base.model';

export interface Language extends BaseModel {
  code: string;
  localName: string;
}
