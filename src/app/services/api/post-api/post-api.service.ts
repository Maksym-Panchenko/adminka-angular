import { Injectable } from '@angular/core';
import { IPost } from "@models/interfaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  readonly path = 'https://jsonplaceholder.typicode.com/';

  getUserPosts(userId: number): Promise<IPost[]> {//Observable<Post[]>
    const fullPath = `${this.path}users/${userId}/posts`;

    return fetch(fullPath)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }

  deletePost(postId: number): Promise<Response> {
    const fullPath = `${this.path}posts/${postId}`;

    return fetch(fullPath, {
      method: 'DELETE',
    });
  }
}

