import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import {SharedModule} from "../../common/shared/shared.module";
import {ModalsModule} from "../../common/modules/modals/modals.module";

@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [CommonModule, SharedModule, ModalsModule],
  exports: [PostsComponent]
})
export class PostsModule {}
