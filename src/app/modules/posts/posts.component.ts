import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PostApiService} from "@services/api/post-api/post-api.service";
import {IPost} from "@models/interfaces/post.interface";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MessageDialogComponent} from "../../common/modules/modals/message-dialog/message-dialog.component";
import {MessageModalType} from "@models/enums/message-modal-type.enum";
import {IMessageModal} from "@models/interfaces/modal/message-modal.inteface";
import {filter} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {EntityDialogComponent} from "../../common/modules/modals/entity-dialog/entity-dialog.component";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {UserService} from "@services/user/user.service";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {ModeType} from "@models/enums/mode-type";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import {IUser} from "@models/interfaces/user.interface";
import {UserApiService} from "@services/api/user-api/user-api.service";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Output() showSelectedPost: EventEmitter<number> = new EventEmitter();
  readonly ModeType: typeof ModeType = ModeType;
  isLoading: boolean = true;
  pageSizes: number[] = [5];
  maxLengthPostBody: number = 50;
  user: IUser;
  userId: number;
  fullBreadCrumbs: boolean = true;
  mode: ModeType;

  dataSource: MatTableDataSource<IPost>;

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'title', 'text', 'actions'];

  constructor(
    private _postsApi: PostApiService,
    protected dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private _user: UserService,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService
  ) {}

  ngOnInit(): void {
    this.userId = this._route?.parent?.snapshot.params['id'];
    if (!this.userId) {
      this.fullBreadCrumbs = false;
      this.userId = this._user.getUserId();
    }
    this.mode = this._user.getMode(this.userId);

    this.getPosts();
  }

  getPosts(): void {
    this._postsApi.getItems(this.userId).subscribe((posts: IPost[]): void => {
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.paginator = this.paginator;

      this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
        this.isLoading = false;
      }, (error) => this.errorAction(error));

    }, (error) => this.errorAction(error));
  }

  deletePost(id: number): void {
    this.dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          title: 'Delete this post?',
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
        this._postsApi.deleteItem(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((e: IPost): boolean => e.id !== id);
          this.isLoading = false;
        }, (error) => this.errorAction(error));
      });
  }

  createPost(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Create new post',
          entityType: EntityModalType.post,
          buttonsNames: {
            approve: 'Create',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newPost): void => {
        if (newPost) {
          this.isLoading = true;
          this._postsApi.createItem(newPost).subscribe((addedPost) => {
            this.dataSource.data = [...this.dataSource.data, addedPost];
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
        name: 'Posts',
        url: ''
      });
    }
  }
}
