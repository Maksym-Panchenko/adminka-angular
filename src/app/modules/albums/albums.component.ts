import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PostApiService} from "@services/api/post-api/post-api.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@services/user/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MessageDialogComponent} from "@modals/message-dialog/message-dialog.component";
import {MessageModalType} from "@models/enums/message-modal-type.enum";
import {IMessageModal} from "@models/interfaces/modal/message-modal.inteface";
import {filter} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import {IAlbum} from "@models/interfaces/album.interface";
import {AlbumApiService} from "@services/api/album-api/album-api.service";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {EntityDialogComponent} from "@modals/entity-dialog/entity-dialog.component";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import {IUser} from "@models/interfaces/user.interface";
import {UserApiService} from "@services/api/user-api/user-api.service";
import {Observable} from "rxjs";
import {SnackBarNotificationType} from "@models/enums/snack-bar-notification-type.enum";
import {BaseItemAbstractComponent} from "@misc/abstracts/base-item.abstract.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent extends BaseItemAbstractComponent implements OnInit {
  @Output() showSelectedAlbum: EventEmitter<number> = new EventEmitter();
  pageSizes: number[] = [5];
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'actions'];
  dataSource: MatTableDataSource<IAlbum>;

  constructor(
    snackBar: MatSnackBar,
    user: UserService,
    route: ActivatedRoute,
    private _postsApi: PostApiService,
    protected dialog: MatDialog,
    private _router: Router,
    private _albumApi: AlbumApiService,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService
  ) {
    super(snackBar, user, route);
  }

  ngOnInit(): void {
    this.defineParams();

    this.getAlbums();
  }

  getAlbums(): void {
    this._albumApi.getItems(this.userId).subscribe((albums) => {
      this.dataSource = new MatTableDataSource(albums);
      this.dataSource.paginator = this.paginator;

      this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
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
          },
          submitHandler: (): Observable<object> => this._albumApi.deleteItem(id)
        } as IMessageModal
      })
      .afterClosed()
      .pipe(
        filter((res: boolean): boolean => res)
      )
      .subscribe((answer): void => {
        if (answer) {
          this.dataSource.data = this.dataSource.data.filter((e: IAlbum): boolean => e.id !== id);
          this.showMessage(SnackBarNotificationType.success, 'Todo has been deleted');
        }
      });
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
          },
          submitHandler: (item: IAlbum): Observable<IAlbum> => this._albumApi.createItem(item)
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newAlbum): void => {
        if (newAlbum) {
          this.dataSource.data = [...this.dataSource.data, newAlbum];
          this.showMessage(SnackBarNotificationType.success, 'Album has been created');
        }
      });
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
