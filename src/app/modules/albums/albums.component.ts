import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PostApiService} from "@services/api/post-api/post-api.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@services/user/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MessageDialogComponent} from "../../common/modules/modals/message-dialog/message-dialog.component";
import {MessageModalType} from "@models/enums/message-modal-type.enum";
import {IMessageModal} from "@models/interfaces/modal/message-modal.inteface";
import {filter} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import {IAlbum} from "@models/interfaces/album.interface";
import {AlbumApiService} from "@services/api/album-api/album-api.service";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {EntityDialogComponent} from "../../common/modules/modals/entity-dialog/entity-dialog.component";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {ModeType} from "@models/enums/mode-type";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import {IUser} from "@models/interfaces/user.interface";
import {UserApiService} from "@services/api/user-api/user-api.service";

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  @Output() showSelectedAlbum: EventEmitter<number> = new EventEmitter();
  @Input() mode: ModeType = ModeType.edit;
  // @Input() userId: number;
  readonly ModeType: typeof ModeType = ModeType;
  isLoading: boolean = true;
  pageSizes: number[] = [5];
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'actions'];
  dataSource: MatTableDataSource<IAlbum>;
  user: IUser;
  userId: number;
  fullBreadCrumbs: boolean = true;

  constructor(
    private _postsApi: PostApiService,
    protected dialog: MatDialog,
    private _router: Router,
    private _user: UserService,
    private _albumApi: AlbumApiService,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this._route?.parent?.snapshot.params['id'];
    if (!this.userId) {
      this.fullBreadCrumbs = false;
      this.userId = this._user.getUserId();
    }

    this.getAlbums();
  }

  getAlbums(): void {
    this._albumApi.getItems(this.userId).subscribe((albums) => {
      this.dataSource = new MatTableDataSource(albums);
      this.dataSource.paginator = this.paginator;

      this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
        this.isLoading = false;
      }, (error) => this.errorAction(error));
    }, (error) => this.errorAction(error));
  }

  deleteItem(id: number): void {
    this.dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          title: 'Delete this Album?',
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
        this.isLoading = true;
        this._albumApi.deleteItem(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((e: IAlbum): boolean => e.id !== id);
          this.isLoading = false;
        }, (error) => this.errorAction(error));
      });
  }

  openAlbum(id: number): void {
    this._router.navigate(['albums', id]);
  }

  showAlbum(id: number): void {
    this.showSelectedAlbum.emit(id);
  }

  createItem(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Create new Album',
          entityType: EntityModalType.album,
          buttonsNames: {
            approve: 'Create',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newAlbum): void => {
        if (newAlbum) {
          this.isLoading = true;
          this._postsApi.createItem(newAlbum).subscribe((addedAlbum) => {
            this.dataSource.data = [...this.dataSource.data, addedAlbum];
            this.isLoading = false;
          }, (error) => this.errorAction(error));
        }
      });
  }

  errorAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoading = false;
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
      }

      this._breadcrumbs.add({
        name: 'Albums',
        url: ''
      });
    }
  }
}
