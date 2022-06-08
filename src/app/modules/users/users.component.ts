import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IUser} from "@models/interfaces/user.interface";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  startUser: number;
  numberOfUsers: number = 3;

  users: IUser[];
  showedUsers: IUser[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        this.users = json;
        this.showUsers()
      });
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .subscribe(() => {
        this.showUsers()
      });
  }

  showUsers() {
    if (this.paginator && this.users?.length) {
      this.startUser = this.paginator.pageIndex * this.paginator.pageSize + 1;
      this.showedUsers = this.users.filter(e => e.id >= this.startUser && e.id < (this.startUser + this.paginator.pageSize));
    }
  }
}
