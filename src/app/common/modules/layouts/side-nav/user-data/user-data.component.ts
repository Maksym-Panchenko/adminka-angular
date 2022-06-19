import {Component, Input, OnInit} from '@angular/core';
import { IUser } from "@models/interfaces/user.interface";
import { UserService } from "@services/user/user.service";
import { Role } from "@models/enums/roles.enum";

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  @Input() currentRole: Role;
  userCompany: string;
  userName: string;

  constructor(private _user: UserService) {}

  ngOnInit(): void {
    if (this.currentRole === Role.user) {
      const currentUser: IUser = this._user.getUser();
      this.userCompany = currentUser.company.name;
      this.userName = currentUser.name;

    } else {
      this.userCompany = 'Adminka';
      this.userName = 'Admin';
    }
  }
}
