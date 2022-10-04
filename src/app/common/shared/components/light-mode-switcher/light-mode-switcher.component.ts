import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'light-mode-switcher',
  templateUrl: './light-mode-switcher.component.html',
  styleUrls: ['./light-mode-switcher.component.scss']
})
export class LightModeSwitcherComponent implements OnInit {
  toggleControl: FormControl = new FormControl(false);
  @Output() changeMode: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe(() => this.changeMode.emit(this.toggleControl.value));
  }
}
