import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService, BaseServiceOptions } from '../../../service/base/base.service';
import { Language } from '../model/language.model';
import { LanguageState } from '../model/language.state';

export const initialState: LanguageState = <LanguageState>{
  currentLanguage: 'en',
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends BaseService<LanguageState> {
  path = `${ this.API }/language`;

  constructor(
    public readonly http: HttpClient,
  ) {
    super(http, initialState, <BaseServiceOptions>{
      reset: false,
    });
  }

  getLanguages(): Observable<Language[]> {
    return this.all<Language>().pipe(
      tap(
        languages => {
          this.dispatch(<LanguageState>{
            all: languages,
          });
        },
      ),
    );
  }

  onChangeLanguage(language: Language) {
    this.dispatch(<LanguageState>{
      currentLanguage: language.code,
    });
  }
}
