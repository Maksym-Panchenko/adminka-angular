import { Component } from '@angular/core';
import { IconsService } from './services/icons/icons.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adminka_na_kolenke';
  isLogined: boolean = false;

  constructor(
    // for icons register
    icons: IconsService
  ) {
  }

  loggedIn(): void {
    this.isLogined = true;
  }
}
