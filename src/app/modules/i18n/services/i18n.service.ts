import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService, BaseServiceOptions } from '../../../services/base.service';
import { I18n } from '../models/i18n.model';
import { I18nState } from '../models/i18n.state';

export const initialState: I18nState = <I18nState>{
};

@Injectable({
  providedIn: 'root',
})
export class I18nService extends BaseService<I18nState> {
  path = `${ this.API_PREFIX }/translate`;

  constructor(
    public readonly http: HttpClient,
  ) {
    super(http, initialState, <BaseServiceOptions>{
      reset: false,
    });
  }

  getI18ns(): Observable<I18n[]> {
    return this.all<I18n>().pipe(
      tap(
        i18ns => {
          this.dispatch(<I18nState>{
            all: i18ns,
          });
        },
      ),
    );
  }
}
