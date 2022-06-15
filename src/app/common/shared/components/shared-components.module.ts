import { NgModule } from '@angular/core';
import {LoadSpinnerModule} from "./load-spinner/load-spinner.module";
import {GalleryModule} from "./gallery/gallery.module";
import {BreadcrumbsModule} from "./breadcrumbs/breadcrumbs.module";

@NgModule({
  exports: [
    LoadSpinnerModule,
    GalleryModule,
    BreadcrumbsModule
  ]
})
export class SharedComponentsModule {}
