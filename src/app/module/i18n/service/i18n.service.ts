import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService, BaseServiceOptions } from '../../../service/base/base.service';
import { I18n } from '../model/i18n.model';
import { I18nState } from '../model/i18n.state';

export const initialState: I18nState = <I18nState>{
};

@Injectable({
  providedIn: 'root',
})
export class I18nService extends BaseService<I18nState> {
  path = `${ this.API }/translate`;

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
