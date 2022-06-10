import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleAlbumComponent } from './single-album.component';
import {SharedModule} from "../../common/shared/shared.module";
import {ModalsModule} from "../../common/modules/modals/modals.module";

@NgModule({
  declarations: [SingleAlbumComponent],
  imports: [CommonModule, SharedModule, ModalsModule],
  exports: [SingleAlbumComponent]
})
export class SingleAlbumModule { }
