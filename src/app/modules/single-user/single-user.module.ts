import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleUserComponent } from './single-user.component';
import {SharedModule} from "../../common/shared/shared.module";
import {TodosModule} from "../todos/todos.module";
import {AlbumsModule} from "../albums/albums.module";
import {SingleAlbumModule} from "../single-album/single-album.module";
import {PostsModule} from "../posts/posts.module";
import {SinglePostModule} from "../single-post/single-post.module";

@NgModule({
  declarations: [SingleUserComponent],
  imports: [CommonModule, SharedModule, TodosModule, AlbumsModule, SingleAlbumModule, PostsModule, SinglePostModule]
})
export class SingleUserModule { }
