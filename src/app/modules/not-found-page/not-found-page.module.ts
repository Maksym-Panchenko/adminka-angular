import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, TranslateModule],
  exports: [NotFoundPageComponent]
})
export class NotFoundPageModule {}
