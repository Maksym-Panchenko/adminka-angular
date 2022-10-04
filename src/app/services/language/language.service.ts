import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends TranslateService {
  saveCurrentLang(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  loadCurrentLang(): string | null {
    return localStorage.getItem('lang');
  }
}
