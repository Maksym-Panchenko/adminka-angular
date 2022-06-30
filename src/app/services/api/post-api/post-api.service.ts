import { Injectable } from '@angular/core';
import { IPost } from "@models/interfaces/post.interface";
import {ApiBaseAbstractService} from "@misc/abstracts/api-base.abstract.service";

@Injectable({
  providedIn: 'root'
})
export class PostApiService extends ApiBaseAbstractService<IPost> {
  readonly entityUrl: string = 'posts';
  readonly parentEntityUrl: string = 'users';

}
