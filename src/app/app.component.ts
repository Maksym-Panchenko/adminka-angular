import {Component, OnInit} from '@angular/core';
import { IconsService } from './services/icons/icons.service'
import {UserService} from "./services/user/user.service";
import {IUser} from "@models/interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adminka_na_kolenke';
  isLogined: boolean = false;
  currentUser: IUser;

  constructor(
    icons: IconsService, // for icons register
    private _user: UserService
  ) {}

  ngOnInit(): void {
    this.isLogined = this._user.isLogin();
  }

  loggedIn(): void {
    this.isLogined = true;
  }

  logOut(): void {
    this._user.logOut();
    this.isLogined = false;
  }


}
