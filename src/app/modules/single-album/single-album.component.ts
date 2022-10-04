import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EntityDialogComponent } from '@modals/entity-dialog/entity-dialog.component';
import { EntityModalType } from '@models/enums/entity-modal-type';
import { IEntityModal } from '@models/interfaces/modal/entity-modal.inteface';
import { IAlbum } from '@models/interfaces/album.interface';
import { IPhoto } from '@models/interfaces/photo.interface';
import { AlbumApiService } from '@services/api/album-api/album-api.service';
import { PhotoApiService } from '@services/api/photo-api/photo-api.service';
import { UserService } from '@services/user/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MessageDialogComponent } from '@modals/message-dialog/message-dialog.component';
import { MessageModalType } from '@models/enums/message-modal-type.enum';
import { IMessageModal } from '@models/interfaces/modal/message-modal.inteface';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BreadcrumbsService } from '@services/breadcrumbs/breadcrumbs.service';
import { IUser } from '@models/interfaces/user.interface';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { BaseItemAbstractComponent } from '@misc/abstracts/base-item.abstract.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackBarNotificationType } from '@models/enums/snack-bar-notification-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss']
})
export class SingleAlbumComponent extends BaseItemAbstractComponent implements OnInit, AfterViewInit {
  @Output() showAlbums: EventEmitter<void> = new EventEmitter();
  @Input() albumId: number;
  album: IAlbum;
  photos: IPhoto[];
  startPhoto: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50];
  showedPhotos: IPhoto[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    user: UserService,
    translate: TranslateService,
    private _albumApi: AlbumApiService,
    private _photoApi: PhotoApiService,
    private _dialog: MatDialog,
    private _location: Location,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService
  ) {
    super(snackBar, user, route, translate);
    route.params.subscribe(params => (this.albumId = parseInt(params['id'])));
  }

  ngOnInit(): void {
    this.defineParams();

    this.getAlbum();
    this.getPhotos();
  }

  getAlbum(): void {
    this._albumApi.getItem(this.albumId).subscribe(
      album => {
        this.album = album;

        this._userApi.getItem(this.userId).subscribe(
          (user: IUser): void => {
            this.user = user;
            this._setBreadcrumbs();
          },
          (error: Error) => this.errorAction(error)
        );
      },
      (error: Error) => this.errorAction(error)
    );
  }

  getPhotos(): void {
    this._photoApi.getItems(this.albumId).subscribe(
      photos => {
        this.photos = photos;
        this.showPhotos();
      },
      (error: Error) => this.errorAction(error)
    );
  }

  editAlbum(): void {
    this._dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'MODAL.EDIT_ALBUM',
          entityType: EntityModalType.album,
          album: Object.assign({}, this.album),
          buttonsNames: {
            approve: 'BUTTONS.SAVE',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (item: IAlbum): Observable<IAlbum> => this._albumApi.updateItem(item)
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedAlbum): void => {
        if (editedAlbum) {
          this.album = editedAlbum;
          this.showMessage(SnackBarNotificationType.success, this._translate.instant('MESSAGES.ALBUM_EDITED'));
        }
      });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.showPhotos();
    });
  }

  showPhotos(): void {
    if (this.paginator && this.photos?.length) {
      this.startPhoto = this.paginator.pageIndex * this.paginator.pageSize;
      this.showedPhotos = this.photos.filter((e, index) => index >= this.startPhoto && index < this.startPhoto + this.paginator.pageSize);
    }
  }

  addPhoto(): void {
    this._dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'MODAL.ADD_PHOTO',
          entityType: EntityModalType.photo,
          albumId: this.albumId,
          buttonsNames: {
            approve: 'BUTTONS.ADD',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (item: IPhoto): Observable<IPhoto> => this._photoApi.createItem(item)
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newPhoto): void => {
        if (newPhoto) {
          this.photos = [newPhoto, ...this.photos];
          this.showPhotos();
        }
      });
  }

  deletePhoto(id: number): void {
    this._dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          title: 'MODAL.DELETE_PHOTO',
          type: MessageModalType.confirm,
          buttonsNames: {
            approve: 'BUTTONS.DELETE',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (): Observable<object> => this._photoApi.deleteItem(id)
        } as IMessageModal
      })
      .afterClosed()
      .pipe(filter((res: boolean): boolean => res))
      .subscribe((answer): void => {
        if (answer) {
          this.photos = this.photos.filter((e: IPhoto): boolean => e.id !== id);
          this.showPhotos();
          this.showMessage(SnackBarNotificationType.success, this._translate.instant('MESSAGES.PHOTO_DELETED'));
        }
      });
  }

  getBack(): void {
    this._location.back();
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {
      if (this.fullBreadCrumbs) {
        this._breadcrumbs.add({
          name: 'BREAD_CRUMBS.USERS',
          url: `/users`
        });
        this._breadcrumbs.add({
          name: this.user.name,
          url: `/users/${this.user.id}`
        });
        this._breadcrumbs.add({
          name: 'BREAD_CRUMBS.ALBUMS',
          url: `/users/${this.album.userId}/albums`
        });
        this._breadcrumbs.add({
          name: this.album?.title,
          url: ''
        });
      } else {
        this._breadcrumbs.add({
          name: 'BREAD_CRUMBS.ALBUMS',
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
