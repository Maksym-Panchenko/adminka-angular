import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private _overlayContainer: OverlayContainer) {}

  load(): boolean {
    return !!localStorage.getItem('darkMode');
  }

  save(value: boolean): void {
    localStorage.setItem('darkMode', value ? 'true' : '');
  }

  switchModalBg(darkMode: boolean): void {
    const darkModeClass = 'darkMode';
    const classes = this._overlayContainer.getContainerElement().classList;
    darkMode ? classes.add(darkModeClass) : classes.remove(darkModeClass);
  }
}
