import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './albums.component';
import {SharedModule} from "../../common/shared/shared.module";
import {ModalsModule} from "../../common/modules/modals/modals.module";

@NgModule({
  declarations: [AlbumsComponent],
  imports: [CommonModule, SharedModule, ModalsModule],
  exports: [AlbumsComponent]
})
export class AlbumsModule {}
