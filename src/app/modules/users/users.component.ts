import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '@models/interfaces/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { BreadcrumbsService } from '@services/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  startUser: number;
  numberOfUsers: number = 5;
  pageSizeOption: number[] = [5, 10];

  users: IUser[];
  showedUsers: IUser[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _userApi: UserApiService, private _breadcrumbs: BreadcrumbsService) {}

  ngOnInit(): void {
    this.getUsers();
    this._setBreadcrumbs();
  }

  getUsers(): void {
    this._userApi.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
      this.showUsers();
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.showUsers();
    });
  }

  showUsers(): void {
    if (this.paginator && this.users?.length) {
      this.startUser = this.paginator.pageIndex * this.paginator.pageSize + 1;
      this.showedUsers = this.users.filter(e => e.id >= this.startUser && e.id < this.startUser + this.paginator.pageSize);
    }
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {
      this._breadcrumbs.add({
        name: 'BREAD_CRUMBS.USERS',
        url: `/users`
      });
    }
  }
}
