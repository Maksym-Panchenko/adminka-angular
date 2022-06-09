import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from "./modules/users/users.module";
import {UsersComponent} from "./modules/users/users.component";
import {PostsComponent} from "./modules/posts/posts.component";
import {PostsModule} from "./modules/posts/posts.module";
import {SinglePostComponent} from "./modules/single-post/single-post.component";
import {SinglePostModule} from "./modules/single-post/single-post.module";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UsersModule, PostsModule, SinglePostModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
