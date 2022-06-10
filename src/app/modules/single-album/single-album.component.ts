import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EntityDialogComponent} from "../../common/modules/modals/entity-dialog/entity-dialog.component";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {IAlbum} from "@models/interfaces/album.interface";
import {IPhoto} from "@models/interfaces/photo.interface";
import {AlbumApiService} from "@services/api/album-api/album-api.service";
import {PhotoApiService} from "@services/api/photo-api/photo-api.service";
import {UserService} from "@services/user/user.service";

@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss']
})
export class SingleAlbumComponent implements OnInit {
  albumId: number;
  album: IAlbum;
  photos: IPhoto[];
  isLoadingAlbum: boolean = true;
  isLoadingPhotos: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _albumApi: AlbumApiService,
    private _photoApi: PhotoApiService,
    private _user: UserService,
    protected dialog: MatDialog
  ) {
    this.route.params.subscribe(params => this.albumId = parseInt(params['id']));
  }

  ngOnInit(): void {
    this.getAlbum();
    this.getPhotos();
  }

  getAlbum(): void {
    this._albumApi.getItem(this.albumId).subscribe((album) => {
      this.album = album;
      this.isLoadingAlbum = false;
    });
  }

  getPhotos(): void {
    this._photoApi.getItems(this._user.getUserId()).subscribe((photos) => {
      this.photos = photos;
    }, (error) => console.log(error), () => this.isLoadingPhotos = false);
  }

  editAlbum(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Edit album',
          entityType: EntityModalType.album,
          album: this.album,
          buttonsNames: {
            approve: 'Save',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedAlbum): void => {
        if (editedAlbum) {
          this._albumApi.updateItem(editedAlbum).subscribe((updatedAlbum) => {
            this.album = updatedAlbum;
          });
        }
      });
  }

}
