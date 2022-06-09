import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPost} from "@models/interfaces/post.interface";
import {PostApiService} from "@services/api/post-api/post-api.service";
import {CommentApiService} from "@services/api/comment-api/comment-api.service";
import {IComment} from "@models/interfaces/comment.interface";
import {PostDialogComponent} from "../../common/modules/modals/post-dialog/post-dialog.component";
import {IPostModal} from "@models/interfaces/modal/post-modal.inteface";
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  postId: number;
  post: IPost;
  comments: IComment[];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _postApi: PostApiService,
    private _commentApi: CommentApiService,
    protected dialog: MatDialog
  ) {
    this.route.params.subscribe(params => this.postId = parseInt(params['id']));
  }

  ngOnInit(): void {
    Promise.all([ this.getPost(), this.getComments()])
      .then(value => {
        // console.log('all ok')
      })
      .finally(() => this.isLoading = false );
  }

  getPost(): Promise<void> {
    return this._postApi.getPost(this.postId)
      .then((post: IPost): void => {
        this.post = post;
      })
      .catch((e: any): void => console.log('Error: Post down...', e))
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
      .open(PostDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Edit post',
          post: this.post,
          buttonsNames: {
            approve: 'Save',
            decline: 'Cancel'
          }
        } as IPostModal
      })
      .afterClosed()
      .subscribe((editedPost): void => {
        if (editedPost) {
          this._postApi.updatePost(editedPost).then((updatedPost) => {
            this.post = updatedPost;
          });
        }
      });
  }
}
