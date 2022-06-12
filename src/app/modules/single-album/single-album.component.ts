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

  startPhoto: number;
  numberOfPhotos: number = 10;
  showedPhotos: IPhoto[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private _albumApi: AlbumApiService,
    private _photoApi: PhotoApiService,
    private _user: UserService,
    protected dialog: MatDialog,
    private location: Location
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
    }, (error) => {
      console.log(error);
      this.isLoadingPhotos = false;
    });
  }

  getPhotos(): void {
    this._photoApi.getItems(this.albumId).subscribe((photos) => {
      this.photos = photos;
      this.showPhotos();
      this.isLoadingPhotos = false;
    }, (error) => {
      console.log(error);
      this.isLoadingPhotos = false;
    });
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
          this._photoApi.createItem(newPhoto).subscribe((addedPhoto) => {
            this.photos = [addedPhoto, ...this.photos];
            this.showPhotos()
          });
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
        this._photoApi.deleteItem(id).subscribe(() => {
          this.photos = this.photos.filter((e: IPhoto): boolean => e.id !== id);
          this.showPhotos()
        });
      });
  }

  getBack(): void {
    this.location.back()
  }

  showAlbumList() {
    this.showAlbums.emit();
  }
}
