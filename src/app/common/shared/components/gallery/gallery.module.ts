import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import {LightgalleryModule} from "lightgallery/angular";
import {MaterialModule} from "../../material/material.module";

@NgModule({
  declarations: [GalleryComponent],
  imports: [CommonModule, LightgalleryModule, MaterialModule],
  exports: [GalleryComponent]
})
export class GalleryModule { }
