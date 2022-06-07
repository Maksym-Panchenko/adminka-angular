import {Component, OnInit} from '@angular/core';
import { IconsService } from './services/icons/icons.service'
import {UserService} from "./services/user/user.service";
import {UsersService} from "./services/users/users.service";
import {User} from "@models/interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adminka_na_kolenke';
  isLogined: boolean = false;
  isLoading: boolean = true;
  currentUser: User;

  constructor(
    // for icons register
    icons: IconsService,
    private _user: UserService,
    private _users: UsersService
  ) {
    this._users.load$.subscribe(() => {
      this.isLoading = false;
    })
  }

  loggedIn(email: string): void {
    this._user.setUserByEmail(email);
    this.isLogined = true;
  }

  logOut(): void {
    this._user.logOut();
    this.isLogined = false;
  }

  ngOnInit(): void {
    this.isLogined = this._user.isLogin();
  }
}
