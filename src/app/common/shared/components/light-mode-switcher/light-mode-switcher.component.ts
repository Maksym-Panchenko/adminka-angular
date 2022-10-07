import { Component, EventEmitter, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '@services/theme/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'light-mode-switcher',
  templateUrl: './light-mode-switcher.component.html',
  styleUrls: ['./light-mode-switcher.component.scss']
})
export class LightModeSwitcherComponent implements OnInit {
  @Output() changeMode: EventEmitter<boolean> = new EventEmitter();
  toggleControl: FormControl = new FormControl(false);
  private darkModeClassName: string = 'darkMode';

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private theme: ThemeService) {}

  ngOnInit(): void {
    this.toggleControl.setValue(this.theme.isDarkMode);
    this.setModeClass(this.theme.isDarkMode);

    this.toggleControl.valueChanges.subscribe((value: boolean): void => {
      this.theme.changeMode(value);
      this.setModeClass(value);
    });
  }

  private setModeClass(value: boolean): void {
    if (value) {
      this.renderer.addClass(this.document.body, this.darkModeClassName);
    } else {
      this.renderer.removeClass(this.document.body, this.darkModeClassName);
    }
  }
}
