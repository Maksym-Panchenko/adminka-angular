import { Component } from '@angular/core';
import { LanguageService } from '@services/language/language.service';

@Component({
  selector: 'select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent {
  constructor(private language: LanguageService) {}

  currentLang(): string {
    return 'LANG.' + this.language.currentLang?.toUpperCase();
  }

  changeLang(lang: any): void {
    this.language.use(lang);

    // save new lang to localStorage
    this.language.saveCurrentLang(lang);
  }

  getLangList() {
    return this.language.getLangs().filter((lang: string): boolean => lang !== this.language.currentLang);
  }
}
