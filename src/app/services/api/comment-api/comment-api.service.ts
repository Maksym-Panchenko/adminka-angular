import { Injectable } from '@angular/core';
import {IComment} from "@models/interfaces/comment.interface";
import {ApiBaseAbstractService} from "../../../misc/abstracts/api-base.abstract.service";

@Injectable({
  providedIn: 'root'
})
export class CommentApiService extends ApiBaseAbstractService<IComment> {
  readonly entityUrl: string = 'comments';
  readonly parentEntityUrl: string = 'posts';
}
