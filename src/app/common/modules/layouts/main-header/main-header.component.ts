import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  @Output() logOutUser: EventEmitter<void> = new EventEmitter();
  @Output() changeMode: EventEmitter<boolean> = new EventEmitter();

  logOut(): void {
    this.logOutUser.emit();
  }
}
