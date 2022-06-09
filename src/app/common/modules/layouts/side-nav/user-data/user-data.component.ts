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
  userPhotoUrl: string = 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';

  constructor(public user: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.user.getUser();
  }
}
