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
  comments = 'comments'
}

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  readonly ModeType: typeof ModeType = ModeType;
  readonly UsersAlbumState: typeof UsersAlbumState = UsersAlbumState;
  selectedTabIndex: number = 0;
  usersAlbumState: UsersAlbumState = UsersAlbumState.albums;
  userId: number;
  albumId: number;
  isLoading: boolean = true;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // get userId
    this._route.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe(id => {
        this.userId = +id;
        this.isLoading = false;
        console.log('SingleUser GET - ', this.userId)
      });
  }

  showSingleAlbum(id: number): void {
    this.albumId = id;
    this.usersAlbumState = UsersAlbumState.singleAlbum;
  }

  showAlbums(): void {
    this.usersAlbumState = UsersAlbumState.albums;
  }
}
