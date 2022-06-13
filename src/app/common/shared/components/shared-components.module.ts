import { NgModule } from '@angular/core';
import {LoadSpinnerModule} from "./load-spinner/load-spinner.module";
import {GalleryModule} from "./gallery/gallery.module";

@NgModule({
  exports: [
    LoadSpinnerModule,
    GalleryModule
  ]
})
export class SharedComponentsModule {}
