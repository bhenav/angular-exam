import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { zip } from 'rxjs';
import { I18nService } from '../../module/i18n/service/i18n.service';
import { LanguageService } from '../../module/language/service/language.service';

@Component({
  selector: 'exam-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly translate: TranslateService,
    private readonly i18nService: I18nService,
    private readonly languageService: LanguageService,
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    zip(
      this.i18nService.getI18ns(),
      this.languageService.getLanguages(),
    )
      .subscribe(() => {
        this.loadLanguage();
      });
  }

  loadLanguage() {
    this.getLanguageWithI18n().forEach(item => {
      this.translate.setTranslation(item.langCode, item.words);
    });
  }

  getLanguageWithI18n(): { langCode: string, words: { [ code: string ]: string; }[] }[] {
    const data = [];
    if (
      this.languageService.state$.value.all
      && this.i18nService.state$.value.all
      && this.languageService.state$.value.all.length
      && this.i18nService.state$.value.all.length
    ) {
      this.languageService.state$.value.all.forEach(item => {
        data.push({
          langCode: item.code,
          words: {},
        });
      });
      this.i18nService.state$.value.all.forEach(item => {
        item.translations.forEach(translation => {
          data.forEach(dataItem => {
            if (dataItem.langCode === translation.language.code) {
              dataItem.words[ item.code ] = translation.message;
            }
          });
        });
      });
    }
    return data;
  }
}
