import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from "./modules/users/users.module";
import {UsersComponent} from "./modules/users/users.component";
import {PostsComponent} from "./modules/posts/posts.component";
import {PostsModule} from "./modules/posts/posts.module";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UsersModule, PostsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
