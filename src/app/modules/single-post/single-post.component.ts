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


@Component({
  selector: 'single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Output() showPosts: EventEmitter<void> = new EventEmitter();
  @Input() mode: ModeType = ModeType.edit;
  @Input() postId: number;
  readonly ModeType: typeof ModeType = ModeType;
  post: IPost;
  comments: IComment[];
  isLoadingPost: boolean = true;
  isLoadingComments: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _postApi: PostApiService,
    private _commentApi: CommentApiService,
    protected dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.getComments();
  }

  getPost(): void {
    this._postApi.getItem(this.postId).subscribe((post) => {
      this.post = post;
      this.isLoadingPost = false;
    }, (error) => {
      console.log(error);
      this.isLoadingPost = false;
    });
  }

  getComments(): void {
    this._commentApi.getItems(this.postId).subscribe((comments: IComment[]) => {
      this.comments = comments;
      this.isLoadingComments = false;
    }, (error) => {
      console.log(error);
      this.isLoadingComments = false;
    });
  }

  editPost(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Edit post',
          entityType: EntityModalType.post,
          post: this.post,
          buttonsNames: {
            approve: 'Save',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedPost): void => {
        if (editedPost) {
          this._postApi.updateItem(editedPost).subscribe((updatedPost) => {
            this.post = updatedPost;
          });
        }
      });
  }

  getBack(): void {
    this.location.back()
  }

  showPostList() {
    this.showPosts.emit();
  }
}
