import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Output() logOutUser: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.logOutUser.emit();
  }
}
