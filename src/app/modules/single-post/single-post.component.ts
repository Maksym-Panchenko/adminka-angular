import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPost} from "@models/interfaces/post.interface";
import {PostApiService} from "@services/api/post-api/post-api.service";
import {CommentApiService} from "@services/api/comment-api/comment-api.service";
import {IComment} from "@models/interfaces/comment.interface";
import {EntityDialogComponent} from "../../common/modules/modals/entity-dialog/entity-dialog.component";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {MatDialog} from "@angular/material/dialog";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {Observable} from "rxjs";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  postId: number;
  post: IPost;
  comments: IComment[];
  isLoadingPost: boolean = true;
  isLoadingComments: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _postApi: PostApiService,
    private _commentApi: CommentApiService,
    protected dialog: MatDialog
  ) {
    this.route.params.subscribe(params => this.postId = parseInt(params['id']));
  }

  ngOnInit(): void {
    Promise.all([ this.getComments()])
      .then(value => {
        // console.log('all ok')
      })
      .finally(() => this.isLoadingComments = false );
    this.getPost();
  }

  getPost(): void {
    this._postApi.getItem(this.postId).subscribe((post) => {
      this.post = post;
      this.isLoadingPost = false;
    });
  }

  getComments(): Promise<void> {
    return this._commentApi.getComments(this.postId)
      .then((comments: IComment[]): void => {
        this.comments = comments;
      })
      .catch((e: any): void => console.log('Error: Comments down...', e))
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
}
