import { NgModule } from '@angular/core';
import {LoadSpinnerModule} from "./load-spinner/load-spinner.module";
import {GalleryAppModule} from "./gallery/gallery.module";
import {BreadcrumbsModule} from "./breadcrumbs/breadcrumbs.module";

@NgModule({
  exports: [
    LoadSpinnerModule,
    GalleryAppModule,
    BreadcrumbsModule
  ]
})
export class SharedComponentsModule {}
