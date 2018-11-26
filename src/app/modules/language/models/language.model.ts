import { BaseModel } from '../../../models/base.model';

export interface Language extends BaseModel {
  code: string;
  localName: string;
}
