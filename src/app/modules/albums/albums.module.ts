import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './albums.component';
import {SharedModule} from "@shared/shared.module";
import {ModalsModule} from "@modals/modals.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AlbumsComponent],
  imports: [CommonModule, SharedModule, ModalsModule, RouterModule],
  exports: [AlbumsComponent]
})
export class AlbumsModule {}
