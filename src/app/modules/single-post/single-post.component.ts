import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '@models/interfaces/post.interface';
import { PostApiService } from '@services/api/post-api/post-api.service';
import { CommentApiService } from '@services/api/comment-api/comment-api.service';
import { IComment } from '@models/interfaces/comment.interface';
import { EntityDialogComponent } from '@modals/entity-dialog/entity-dialog.component';
import { IEntityModal } from '@models/interfaces/modal/entity-modal.inteface';
import { MatDialog } from '@angular/material/dialog';
import { EntityModalType } from '@models/enums/entity-modal-type';
import { Location } from '@angular/common';
import { MessageDialogComponent } from '@modals/message-dialog/message-dialog.component';
import { MessageModalType } from '@models/enums/message-modal-type.enum';
import { IMessageModal } from '@models/interfaces/modal/message-modal.inteface';
import { filter } from 'rxjs/operators';
import { BreadcrumbsService } from '@services/breadcrumbs/breadcrumbs.service';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { IUser } from '@models/interfaces/user.interface';
import { UserService } from '@services/user/user.service';
import { BaseItemAbstractComponent } from '@misc/abstracts/base-item.abstract.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackBarNotificationType } from '@models/enums/snack-bar-notification-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent extends BaseItemAbstractComponent implements OnInit {
  @Output() showPosts: EventEmitter<void> = new EventEmitter();
  @Input() postId: number;
  post: IPost;
  comments: IComment[];

  constructor(
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    user: UserService,
    translate: TranslateService,
    private _postApi: PostApiService,
    private _commentApi: CommentApiService,
    private _dialog: MatDialog,
    private _location: Location,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService
  ) {
    super(snackBar, user, route, translate);
    route.params.subscribe(params => (this.postId = parseInt(params['id'])));
  }

  ngOnInit(): void {
    this.defineParams();

    this.getPost();
    this.getComments();
  }

  getPost(): void {
    this._postApi.getItem(this.postId).subscribe(
      (post: IPost): void => {
        this.post = post;

        this._userApi.getItem(this.userId).subscribe(
          (user: IUser): void => {
            this.user = user;
            this._setBreadcrumbs();
          },
          error => this.errorAction(error)
        );
      },
      error => this.errorAction(error)
    );
  }

  getComments(): void {
    this._commentApi.getItems(this.postId).subscribe(
      (comments: IComment[]): void => {
        this.comments = comments;
      },
      error => this.errorAction(error)
    );
  }

  editPost(): void {
    this._dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'MODAL.EDIT_POST',
          entityType: EntityModalType.post,
          post: Object.assign({}, this.post),
          buttonsNames: {
            approve: 'BUTTONS.SAVE',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (item: IPost): Observable<IPost> => this._postApi.updateItem(item)
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedPost): void => {
        if (editedPost) {
          this.post = editedPost;
          this.showMessage(SnackBarNotificationType.success, this._translate.instant('MESSAGES.POST_EDITED'));
        }
      });
  }

  getBack(): void {
    this._location.back();
  }

  deleteComment(id: number): void {
    this._dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'MODAL.DELETE_COMMENT',
          type: MessageModalType.confirm,
          buttonsNames: {
            approve: 'BUTTONS.DELETE',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (): Observable<object> => this._commentApi.deleteItem(id)
        } as IMessageModal
      })
      .afterClosed()
      .pipe(filter((res: boolean): boolean => res))
      .subscribe((answer): void => {
        if (answer) {
          const index = this.comments.findIndex(e => e.id === id);
          this.comments.splice(index, 1);
          this.showMessage(SnackBarNotificationType.success, this._translate.instant('MESSAGES.COMMENT_DELETED'));
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
        this._breadcrumbs.add({
          name: 'BREAD_CRUMBS.POSTS',
          url: `/users/${this.post.userId}/posts`
        });
        this._breadcrumbs.add({
          name: this.post?.title,
          url: `/:id`
        });
      } else {
        this._breadcrumbs.add({
          name: 'BREAD_CRUMBS.POSTS',
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
