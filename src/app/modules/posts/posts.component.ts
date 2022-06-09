import {Component, OnInit, ViewChild} from '@angular/core';
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
import {PostDialogComponent} from "../../common/modules/modals/post-dialog/post-dialog.component";
import {IPostModal} from "@models/interfaces/modal/post-modal.inteface";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoading: boolean = true;
  posts: IPost[];
  pageSizes: number[] = [5];
  maxLengthPostBody: number = 50;

  dataSource: MatTableDataSource<IPost>;

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'title', 'text', 'actions'];

  constructor(private _postsApi: PostApiService, protected dialog: MatDialog, private _router: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this._postsApi.getPosts(1)
      .then((posts: IPost[]): void => {
        this.posts = posts;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
      })
      .catch((e: any): void => console.log(e))
      .finally(() => this.isLoading = false )
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
        this._postsApi.deletePost(id).then(() => {
          this.dataSource.data = this.dataSource.data.filter((e: IPost): boolean => e.id !== id);
        });
      });
  }

  openPost(id: number): void {
    this._router.navigate(['posts', id]);
  }

  createPost(): void {
    this.dialog
      .open(PostDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Create new post',
          buttonsNames: {
            approve: 'Create',
            decline: 'Cancel'
          }
        } as IPostModal
      })
      .afterClosed()
      .subscribe((newPost): void => {
        if (newPost) {
          this._postsApi.addPost(newPost).then((addedPost) => {
            this.dataSource.data = [...this.dataSource.data, addedPost];
          });
        }
      });
  }
}
