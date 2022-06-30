import {Component, OnInit} from '@angular/core';
import { IconsService } from '@services/icons/icons.service'
import { UserService } from "@services/user/user.service";
import { IUser } from "@models/interfaces/user.interface";
import { Role } from "@models/enums/roles.enum";
import { Router } from "@angular/router";
import {SpinnerService} from "@services/spinner/spinner.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adminka_na_kolenke';
  isLogined: boolean = false;
  currentUser: IUser;
  currentRole: Role;

  loading$ = this.spinner.loading$;

  constructor(
    icons: IconsService, // for icons register
    private _user: UserService,
    private _router: Router,
    public spinner: SpinnerService,
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.isLogined = this._user.isLogin();
    if (this.isLogined) {
      this.currentRole = this._user.getRole();
    }
  }

  loggedIn(): void {
    this.isLogined = true;
    this.currentRole = this._user.getRole();
    this._router.navigate(['/']);
  }

  logOut(): void {
    this._user.logOut();
    this.isLogined = false;
  }
}
