import { Component, OnInit } from '@angular/core';
import {ModeType} from "@models/enums/mode-type";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import { UserApiService } from "@services/api/user-api/user-api.service";
import {IUser} from "@models/interfaces/user.interface";
import {NavItem} from "@models/interfaces/nav-item.interface";

export enum UsersAlbumState {
  albums= 'albums',
  singleAlbum = 'singleAlbum'
}

export enum UsersPostState {
  posts= 'posts',
  singlePost = 'singlePost'
}

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  readonly ModeType: typeof ModeType = ModeType;
  readonly UsersAlbumState: typeof UsersAlbumState = UsersAlbumState;
  readonly UsersPostState: typeof UsersPostState = UsersPostState;
  selectedTabIndex: number = 0;
  usersAlbumState: UsersAlbumState = UsersAlbumState.albums;
  usersPostState: UsersPostState = UsersPostState.posts;
  user: IUser;
  userId: number;
  albumId: number;
  postId: number;
  isLoading: boolean = true;

  navItems: NavItem[] = [
    {
      icon: 'users',
      title: 'User data',
      // link: './users'
    },
    {
      icon: 'posts',
      title: 'Posts',
      link: './posts'
    },
    {
      icon: 'photo',
      title: 'Albums',
      link: './albums'
    },
    {
      icon: 'text',
      title: 'Todos',
      link: './todos'
    }
  ];

  constructor(
    private _route: ActivatedRoute,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService
  ) {}

  ngOnInit(): void {
    // get userId
    this._route.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe(id => {
        this.userId = +id;
        this.getUser();
      });
  }

  showSingleAlbum(id: number): void {
    this.albumId = id;
    this.usersAlbumState = UsersAlbumState.singleAlbum;
  }

  showAlbums(): void {
    this.usersAlbumState = UsersAlbumState.albums;
  }

  showSinglePost(id: number): void {
    this.postId = id;
    this.usersPostState = UsersPostState.singlePost;
  }

  showPosts(): void {
    this.usersPostState = UsersPostState.posts;
  }

  getUser(): void {
    this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
      this.user = user;
      this._setBreadcrumbs();
      this.isLoading = false;
    }, error => this.errorAction(error));
  }

  errorAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoading = false;
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {
      this._breadcrumbs.add({
        name: 'Users',
        url: `/users`
      });
      this._breadcrumbs.add({
        name: this.user?.name,
        url: `/:id`
      });
    }
  }
}
