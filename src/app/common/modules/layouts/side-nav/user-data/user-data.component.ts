import {Component, Input, OnInit} from '@angular/core';
import {User} from "@models/interfaces/user.interface";

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  // @Input() user: User;
  userPhotoUrl: string = 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';

  constructor() {
  }

  ngOnInit(): void {
  }

}
