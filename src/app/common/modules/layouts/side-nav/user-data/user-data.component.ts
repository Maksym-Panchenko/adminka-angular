import {Component, OnInit} from '@angular/core';
import {IUser} from "@models/interfaces/user.interface";
import {UserService} from "@services/user/user.service";

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  currentUser: IUser | null;
  constructor(private _user: UserService) {}

  ngOnInit(): void {
    this.currentUser = this._user.getUser();
  }
}
