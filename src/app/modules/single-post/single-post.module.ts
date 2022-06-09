import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePostComponent } from './single-post.component';
import {SharedModule} from "../../common/shared/shared.module";
import {ModalsModule} from "../../common/modules/modals/modals.module";

@NgModule({
  declarations: [SinglePostComponent],
  imports: [CommonModule, SharedModule, ModalsModule],
  exports: [SinglePostComponent]
})
export class SinglePostModule {}
