import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'light-mode-switcher',
  templateUrl: './light-mode-switcher.component.html',
  styleUrls: ['./light-mode-switcher.component.scss']
})
export class LightModeSwitcherComponent implements OnInit {
  toggleControl: FormControl = new FormControl(false);
  @Output() changeMode: EventEmitter<boolean> = new EventEmitter();

  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    this.toggleControl.setValue(this.theme.load());

    this.toggleControl.valueChanges.subscribe(() => {
      this.changeMode.emit(this.toggleControl.value);
      this.theme.save(this.toggleControl.value);
    });
  }
}
