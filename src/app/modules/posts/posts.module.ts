import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import {SharedModule} from "@shared/shared.module";
import {ModalsModule} from "@modals/modals.module";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, SharedModule, ModalsModule, RouterModule, TranslateModule],
  exports: [PostsComponent]
})
export class PostsModule {}
