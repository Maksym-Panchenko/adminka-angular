import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  load(): boolean {
    return !!localStorage.getItem('darkMode');
  }

  save(value: boolean): void {
    localStorage.setItem('darkMode', value ? 'true' : '');
  }
}
