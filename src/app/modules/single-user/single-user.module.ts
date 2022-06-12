import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleUserComponent } from './single-user.component';
import {SharedModule} from "../../common/shared/shared.module";
import {TodosModule} from "../todos/todos.module";
import {AlbumsModule} from "../albums/albums.module";
import {SingleAlbumModule} from "../single-album/single-album.module";

@NgModule({
  declarations: [SingleUserComponent],
  imports: [CommonModule, SharedModule, TodosModule, AlbumsModule, SingleAlbumModule]
})
export class SingleUserModule { }
