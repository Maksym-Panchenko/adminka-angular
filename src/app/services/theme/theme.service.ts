import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode: boolean = isPlatformBrowser(this.platformId) && !!localStorage.getItem('darkMode');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  changeMode(value: boolean): void {
    this.isDarkMode = value;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', value ? 'true' : '');
    }
  }
}
