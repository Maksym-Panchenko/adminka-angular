import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "@models/interfaces/user.interface";
import {UserService} from "@services/user/user.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
