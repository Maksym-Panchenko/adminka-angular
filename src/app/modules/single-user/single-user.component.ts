import { Component, OnInit } from '@angular/core';
import { ModeType } from '@models/enums/mode-type';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BreadcrumbsService } from '@services/breadcrumbs/breadcrumbs.service';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { IUser } from '@models/interfaces/user.interface';
import { NavItem } from '@models/interfaces/nav-item.interface';
import { SnackBarNotificationType } from '@models/enums/snack-bar-notification-type.enum';
import { SNACKBAR_CONFIG } from '@misc/constants/snackbar-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  readonly ModeType: typeof ModeType = ModeType;
  user: IUser;
  userId: number;

  navItems: NavItem[] = [
    {
      icon: 'users',
      title: 'USER_DATA',
      link: './user-data'
    },
    {
      icon: 'posts',
      title: 'POSTS',
      link: './posts'
    },
    {
      icon: 'photo',
      title: 'ALBUMS',
      link: './albums'
    },
    {
      icon: 'text',
      title: 'TODOS',
      link: './todos'
    }
  ];

  constructor(
    private _route: ActivatedRoute,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService,
    private _snackBar: MatSnackBar,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.pipe(switchMap(params => params.getAll('id'))).subscribe(id => {
      this.userId = +id;
      this.getUser();
    });
  }

  getUser(): void {
    this._userApi.getItem(this.userId).subscribe(
      (user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
      },
      error => this.errorAction(error)
    );
  }

  errorAction(error: Error): void {
    console.log('Error: ', error);
    this.showMessage(SnackBarNotificationType.error, this._translate.instant('MESSAGES.COMMON_ERROR'));
  }

  showMessage(result: SnackBarNotificationType, message: string): void {
    this._snackBar.open(message, undefined, { ...SNACKBAR_CONFIG, panelClass: result });
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {
      this._breadcrumbs.add({
        name: 'BREAD_CRUMBS.USERS',
        url: `/users`
      });
      this._breadcrumbs.add({
        name: this.user?.name,
        url: `/:id`
      });
    }
  }
}
