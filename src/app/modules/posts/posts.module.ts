import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import {SharedModule} from "@shared/shared.module";
import {ModalsModule} from "@modals/modals.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, SharedModule, ModalsModule, RouterModule],
  exports: [PostsComponent]
})
export class PostsModule {}
