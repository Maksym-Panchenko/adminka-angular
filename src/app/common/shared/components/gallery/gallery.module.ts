import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import {MaterialModule} from "@shared/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LightboxModule} from "ng-gallery/lightbox";
import {GalleryModule} from "ng-gallery";

@NgModule({
  declarations: [GalleryComponent],
  imports: [CommonModule, MaterialModule, BrowserAnimationsModule, GalleryModule, LightboxModule],
  exports: [GalleryComponent]
})
export class GalleryAppModule { }
