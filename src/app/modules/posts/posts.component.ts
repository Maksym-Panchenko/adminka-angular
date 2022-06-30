import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PostApiService} from "@services/api/post-api/post-api.service";
import {IPost} from "@models/interfaces/post.interface";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MessageDialogComponent} from "@modals/message-dialog/message-dialog.component";
import {MessageModalType} from "@models/enums/message-modal-type.enum";
import {IMessageModal} from "@models/interfaces/modal/message-modal.inteface";
import {filter} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {EntityDialogComponent} from "@modals/entity-dialog/entity-dialog.component";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {UserService} from "@services/user/user.service";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import {IUser} from "@models/interfaces/user.interface";
import {UserApiService} from "@services/api/user-api/user-api.service";
import {BaseItemAbstractComponent} from "@misc/abstracts/base-item.abstract.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {SnackBarNotificationType} from "@models/enums/snack-bar-notification-type.enum";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends BaseItemAbstractComponent implements OnInit {
  @Output() showSelectedPost: EventEmitter<number> = new EventEmitter();
  pageSizes: number[] = [5];
  maxLengthPostBody: number = 50;
  dataSource: MatTableDataSource<IPost>;
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'text', 'actions'];

  constructor(
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    user: UserService,
    private _postApi: PostApiService,
    private _dialog: MatDialog,
    private _router: Router,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService
  ) {
    super(snackBar, user, route);
  }

  ngOnInit(): void {
    this.defineParams();

    this.getPosts();
  }

  getPosts(): void {
    this._postApi.getItems(this.userId).subscribe((posts: IPost[]): void => {
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.paginator = this.paginator;

      this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
      }, (error) => this.errorAction(error));
    }, (error) => this.errorAction(error));
  }

  deletePost(id: number): void {
    this._dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          title: 'Delete this post?',
          type: MessageModalType.confirm,
          buttonsNames: {
            approve: 'Delete',
            decline: 'Cancel'
          },
          submitHandler: (): Observable<object> => this._postApi.deleteItem(id)
        } as IMessageModal
      })
      .afterClosed()
      .pipe(
        filter((res: boolean): boolean => res)
      )
      .subscribe((answer): void => {
        if (answer) {
          this.dataSource.data = this.dataSource.data.filter((e: IPost): boolean => e.id !== id);
          this.showMessage(SnackBarNotificationType.success, 'Post has been deleted');
        }
      });
  }

  createPost(): void {
    this._dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Create new post',
          entityType: EntityModalType.post,
          buttonsNames: {
            approve: 'Create',
            decline: 'Cancel'
          },
          submitHandler: (item: IPost): Observable<IPost> => this._postApi.createItem(item)
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newPost): void => {
        if (newPost) {
          this.dataSource.data = [...this.dataSource.data, newPost];
          this.showMessage(SnackBarNotificationType.success, 'Post has been created');
        }
      });
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
      }

      this._breadcrumbs.add({
        name: 'BREAD_CRUMBS.POSTS',
        url: ''
      });
    }
  }
}
