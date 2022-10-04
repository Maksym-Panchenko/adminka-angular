import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from "@modules/users/users.module";
import {UsersComponent} from "@modules/users/users.component";
import {PostsComponent} from "@modules/posts/posts.component";
import {PostsModule} from "@modules/posts/posts.module";
import {SinglePostComponent} from "@modules/single-post/single-post.component";
import {SinglePostModule} from "@modules/single-post/single-post.module";
import {AlbumsComponent} from "@modules/albums/albums.component";
import {AlbumsModule} from "@modules/albums/albums.module";
import {SingleAlbumComponent} from "@modules/single-album/single-album.component";
import {SingleAlbumModule} from "@modules/single-album/single-album.module";
import {TodosComponent} from "@modules/todos/todos.component";
import {TodosModule} from "@modules/todos/todos.module";
import {SingleUserComponent} from "@modules/single-user/single-user.component";
import {SingleUserModule} from "@modules/single-user/single-user.module";
import {NotFoundPageComponent} from "@modules/not-found-page/not-found-page.component";
import {UserDataComponent} from "@modules/user-data/user-data.component";
import {UserDataModule} from "@modules/user-data/user-data.module";
import {NotFoundPageModule} from "@modules/not-found-page/not-found-page.module";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:id',
    component: SingleUserComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-data'
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: 'user-data',
        component: UserDataComponent
      },
      {
        path: 'posts/:id',
        component: SinglePostComponent
      },
      {
        path: 'albums',
        component: AlbumsComponent
      },
      {
        path: 'albums/:id',
        component: SingleAlbumComponent
      },
      {
        path: 'todos',
        component: TodosComponent
      },
    ]
  },
  {
    path: 'user-data',
    component: UserDataComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'albums/:id',
    component: SingleAlbumComponent
  },
  {
    path: 'todos',
    component: TodosComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users'
  },
  {
    path: '**',
    redirectTo: '/404'
  },
  {
    path: '404',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    UsersModule,
    PostsModule,
    SinglePostModule,
    AlbumsModule,
    SingleAlbumModule,
    TodosModule,
    SingleUserModule,
    UserDataModule,
    NotFoundPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
