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
import {Router} from "@angular/router";
import {EntityDialogComponent} from "../../common/modules/modals/entity-dialog/entity-dialog.component";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {UserService} from "@services/user/user.service";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {ModeType} from "@models/enums/mode-type";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Output() showSelectedPost: EventEmitter<number> = new EventEmitter();
  @Input() userId: number;
  @Input() mode: ModeType = ModeType.edit;
  readonly ModeType: typeof ModeType = ModeType;
  isLoading: boolean = true;
  posts: IPost[];
  pageSizes: number[] = [5];
  maxLengthPostBody: number = 50;

  dataSource: MatTableDataSource<IPost>;

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'title', 'text', 'actions'];

  constructor(
    private _postsApi: PostApiService,
    protected dialog: MatDialog,
    private _router: Router,
    private _user: UserService
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
      this.userId = this._user.getUserId();
    }
    this.getPosts();
  }

  getPosts(): void {
    this._postsApi.getItems(this.userId).subscribe((posts) => {
      this.posts = posts;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
    }, (error) => console.log(error), () => this.isLoading = false);
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
        this._postsApi.deleteItem(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((e: IPost): boolean => e.id !== id);
        });
      });
  }

  openPost(id: number): void {
    this._router.navigate(['posts', id]);
  }

  showPost(id: number): void {
    this.showSelectedPost.emit(id);
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
          this._postsApi.createItem(newPost).subscribe((addedPost) => {
            this.dataSource.data = [...this.dataSource.data, addedPost];
          });
        }
      });
  }
}
