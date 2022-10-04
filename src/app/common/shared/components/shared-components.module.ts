import { NgModule } from '@angular/core';
import { LoadSpinnerModule } from './load-spinner/load-spinner.module';
import { GalleryAppModule } from './gallery/gallery.module';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { SelectLangModule } from '@shared/components/select-lang/select-lang.module';

@NgModule({
  exports: [LoadSpinnerModule, GalleryAppModule, BreadcrumbsModule, SelectLangModule]
})
export class SharedComponentsModule {}
