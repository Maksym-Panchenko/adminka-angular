import { Injectable } from '@angular/core';
import {IComment} from "@models/interfaces/comment.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {
  readonly path = 'https://jsonplaceholder.typicode.com/';

  getComments(postId: number): Promise<IComment[]> {
    const fullPath = `${this.path}post/${postId}/comments`;

    return fetch(fullPath)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }
}
