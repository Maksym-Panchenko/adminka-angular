import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPost} from "@models/interfaces/post.interface";
import {PostApiService} from "@services/api/post-api/post-api.service";
import {CommentApiService} from "@services/api/comment-api/comment-api.service";
import {IComment} from "@models/interfaces/comment.interface";
import {EntityDialogComponent} from "../../common/modules/modals/entity-dialog/entity-dialog.component";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {MatDialog} from "@angular/material/dialog";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {ModeType} from "@models/enums/mode-type";
import { Location } from '@angular/common'
import {MessageDialogComponent} from "../../common/modules/modals/message-dialog/message-dialog.component";
import {MessageModalType} from "@models/enums/message-modal-type.enum";
import {IMessageModal} from "@models/interfaces/modal/message-modal.inteface";
import {filter} from "rxjs/operators";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import { UserApiService } from "@services/api/user-api/user-api.service";
import {IUser} from "@models/interfaces/user.interface";
import {UserService} from "@services/user/user.service";


@Component({
  selector: 'single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Output() showPosts: EventEmitter<void> = new EventEmitter();
  @Input() postId: number;
  readonly ModeType: typeof ModeType = ModeType;
  post: IPost;
  user: IUser;
  userId: number;
  comments: IComment[];
  isLoadingPost: boolean = true;
  isLoadingComments: boolean = true;
  fullBreadCrumbs: boolean = true;
  mode: ModeType;

  constructor(
    private _route: ActivatedRoute,
    private _postApi: PostApiService,
    private _commentApi: CommentApiService,
    protected dialog: MatDialog,
    private location: Location,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService,
    private _user: UserService
  ) {
    this._route.params.subscribe(params => this.postId = parseInt(params['id']));
  }

  ngOnInit(): void {
    this.userId = this._route?.parent?.snapshot.params['id'];
    if (!this.userId) {
      this.fullBreadCrumbs = false;
      this.userId = this._user.getUserId();
    }
    this.mode = this._user.getMode(this.userId);

    this.getPost();
    this.getComments();
  }

  getPost(): void {
    this._postApi.getItem(this.postId).subscribe((post: IPost): void => {
      this.post = post;

      this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
        this.isLoadingPost = false;
      }, error => this.errorPostAction(error));
    }, error => this.errorPostAction(error));
  }

  getComments(): void {
    this._commentApi.getItems(this.postId).subscribe((comments: IComment[]): void => {
      this.comments = comments;
      this.isLoadingComments = false;
    }, error => this.errorCommentAction(error));
  }

  editPost(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Edit post',
          entityType: EntityModalType.post,
          post: Object.assign({}, this.post),
          buttonsNames: {
            approve: 'Save',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedPost): void => {
        if (editedPost) {
          this.isLoadingPost = true;
          this._postApi.updateItem(editedPost).subscribe((updatedPost) => {
            this.post = updatedPost;
            this.isLoadingPost = false;
          }, error => this.errorPostAction(error));
        }
      });
  }

  getBack(): void {
    this.location.back()
  }

  showPostList() {
    this.showPosts.emit();
  }

  deleteComment(id: number): void {
    this.dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Delete comment?',
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
      .subscribe((editedPost): void => {
        this.isLoadingComments= true;
        this._commentApi.deleteItem(id).subscribe(() => {
          const index = this.comments.findIndex(e => e.id === id);
          this.comments.splice(index, 1);
          this.isLoadingComments= false;
        }, error => this.errorCommentAction(error));
      });
  }

  errorCommentAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoadingComments = false;
  }

  errorPostAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoadingPost = false;
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
          name: 'Posts',
          url: `/users/${this.post.userId}/posts`
        });
        this._breadcrumbs.add({
          name: this.post?.title,
          url: `/:id`
        });

      } else {
        this._breadcrumbs.add({
          name: 'Posts',
          url: `/posts`
        });
        this._breadcrumbs.add({
          name: this.post?.title,
          url: ''
        });
      }
    }
  }
}
