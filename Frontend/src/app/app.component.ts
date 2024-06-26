import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG, I18N_LANGUAGES } from '../config/language-config';
@Component({
  selector: 'da-app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  currentLang = DEFAULT_LANG;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(I18N_LANGUAGES);
    translate.setDefaultLang(DEFAULT_LANG);
    console.log(this.currentLang);
    translate.use(this.currentLang);
  }
}
