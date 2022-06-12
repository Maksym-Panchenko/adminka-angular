import { Component, OnInit } from '@angular/core';
import {ModeType} from "@models/enums/mode-type";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";

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
  userId: number;
  albumId: number;
  postId: number;
  isLoading: boolean = true;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // get userId
    this._route.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe(id => {
        this.userId = +id;
        this.isLoading = false;
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
}
