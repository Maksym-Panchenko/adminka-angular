import { Injectable } from '@angular/core';
import { IPost } from "@models/interfaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  readonly path = 'https://jsonplaceholder.typicode.com/';

  getPosts(userId: number): Promise<IPost[]> {//Observable<Post[]>
    const fullPath = `${this.path}users/${userId}/posts`;

    return fetch(fullPath)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }

  getPost(postId: number): Promise<IPost> {//Observable<Post[]>
    const fullPath = `${this.path}posts/${postId}`;

    return fetch(fullPath)
      .then((response) => response.json())
      .then((json) => json);
  }

  deletePost(postId: number): Promise<Response> {
    const fullPath = `${this.path}posts/${postId}`;

    return fetch(fullPath, {
      method: 'DELETE',
    });
  }

  addPost(post: IPost): Promise<IPost> {
    const fullPath = `${this.path}posts`;

    return fetch(fullPath, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((response) => response.json())
  }

  updatePost(post: IPost): Promise<IPost> {
    const fullPath = `${this.path}posts/${post.id}`;

    return fetch(fullPath, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((response) => response.json())
  }
}
