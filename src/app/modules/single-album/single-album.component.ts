import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
import {MatPaginator} from "@angular/material/paginator";
import {MessageDialogComponent} from "../../common/modules/modals/message-dialog/message-dialog.component";
import {MessageModalType} from "@models/enums/message-modal-type.enum";
import {IMessageModal} from "@models/interfaces/modal/message-modal.inteface";
import {filter} from "rxjs/operators";
import {ModeType} from "@models/enums/mode-type";
import { Location } from '@angular/common'
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import {IUser} from "@models/interfaces/user.interface";
import {UserApiService} from "@services/api/user-api/user-api.service";

@Component({
  selector: 'single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss']
})
export class SingleAlbumComponent implements OnInit, AfterViewInit {
  @Output() showAlbums: EventEmitter<void> = new EventEmitter();
  @Input() mode: ModeType = ModeType.edit;
  @Input() albumId: number;
  readonly ModeType: typeof ModeType = ModeType;
  album: IAlbum;
  photos: IPhoto[];
  isLoadingAlbum: boolean = true;
  isLoadingPhotos: boolean = true;
  user: IUser;
  userId: number;
  startPhoto: number;
  numberOfPhotos: number = 10;
  showedPhotos: IPhoto[];
  fullBreadCrumbs: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private _albumApi: AlbumApiService,
    private _photoApi: PhotoApiService,
    private _user: UserService,
    protected dialog: MatDialog,
    private _location: Location,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService,
    private _route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => this.albumId = parseInt(params['id']));
  }

  ngOnInit(): void {
    this.userId = this._route?.parent?.snapshot.params['id'];
    if (!this.userId) {
      this.fullBreadCrumbs = false;
      this.userId = this._user.getUserId();
    }

    this.getAlbum();
    this.getPhotos();
  }

  getAlbum(): void {
    this._albumApi.getItem(this.albumId).subscribe((album) => {
      this.album = album;

      this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
        this.isLoadingAlbum = false;
      }, error => this.errorAlbumAction(error));

    }, (error: Error) => this.errorAlbumAction(error));
  }

  getPhotos(): void {
    this._photoApi.getItems(this.albumId).subscribe((photos) => {
      this.photos = photos;
      this.showPhotos();
      this.isLoadingPhotos = false;
    }, (error: Error) => this.errorPhotoAction(error));
  }

  editAlbum(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Edit album',
          entityType: EntityModalType.album,
          album: Object.assign({}, this.album),
          buttonsNames: {
            approve: 'Save',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedAlbum): void => {
        if (editedAlbum) {
          this.isLoadingAlbum = true;
          this._albumApi.updateItem(editedAlbum).subscribe((updatedAlbum) => {
            this.album = updatedAlbum;
            this.isLoadingAlbum = false;
          }, (error: Error) => this.errorAlbumAction(error));
        }
      });
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .subscribe(() => {
        this.showPhotos()
      });
  }

  showPhotos(): void {
    if (this.paginator && this.photos?.length) {
      this.startPhoto = this.paginator.pageIndex * this.paginator.pageSize;
      this.showedPhotos = this.photos.filter((e, index) => (index) >= this.startPhoto && index < (this.startPhoto + this.paginator.pageSize));
    }
  }

  addPhoto(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Add photo',
          entityType: EntityModalType.photo,
          albumId: this.albumId,
          buttonsNames: {
            approve: 'Add',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newPhoto): void => {
        if (newPhoto) {
          this.isLoadingPhotos = true;
          this._photoApi.createItem(newPhoto).subscribe((addedPhoto) => {
            this.photos = [addedPhoto, ...this.photos];
            this.showPhotos();
            this.isLoadingPhotos = false;
          }, (error) => this.errorPhotoAction(error));
        }
      });
  }

  deletePhoto(id: number): void {
    this.dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          title: 'Delete this Photo?',
          type: MessageModalType.confirm,
          buttonsNames: {
            approve: 'Delete',
            decline: 'Cancel'
          }
        } as IMessageModal
      })
      .afterClosed()
      .pipe(
        filter((res: boolean): boolean => res)
      )
      .subscribe((): void => {
        this.isLoadingPhotos = true;
        this._photoApi.deleteItem(id).subscribe(() => {
          this.photos = this.photos.filter((e: IPhoto): boolean => e.id !== id);
          this.showPhotos();
          this.isLoadingPhotos = false;
        }, (error) => this.errorPhotoAction(error));
      });
  }

  getBack(): void {
    this._location.back()
  }

  showAlbumList() {
    this.showAlbums.emit();
  }

  errorPhotoAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoadingPhotos = false;
  }

  errorAlbumAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoadingAlbum = false;
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {

      if (this.fullBreadCrumbs) {
        this._breadcrumbs.add({
          name: 'Users',
          url: `/users`
        });
        this._breadcrumbs.add({
          name: this.user.name,
          url: `/users/${this.user.id}`
        });
        this._breadcrumbs.add({
          name: 'Albums',
          url: `/users/${this.album.userId}/albums`
        });
        this._breadcrumbs.add({
          name: this.album?.title,
          url: ''
        });

      } else {
        this._breadcrumbs.add({
          name: 'Albums',
          url: `/albums`
        });
        this._breadcrumbs.add({
          name: this.album?.title,
          url: ''
        });
      }
    }
  }
}
