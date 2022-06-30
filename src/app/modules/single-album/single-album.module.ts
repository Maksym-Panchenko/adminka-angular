import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleAlbumComponent } from './single-album.component';
import {SharedModule} from "@shared/shared.module";
import {ModalsModule} from "@modals/modals.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [SingleAlbumComponent],
  imports: [CommonModule, SharedModule, ModalsModule, TranslateModule],
  exports: [SingleAlbumComponent]
})
export class SingleAlbumModule { }
