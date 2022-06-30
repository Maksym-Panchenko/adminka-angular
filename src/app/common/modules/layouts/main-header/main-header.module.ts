import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { MaterialModule } from "@shared/material/material.module";

@NgModule({
  declarations: [MainHeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MainHeaderComponent]
})
export class MainHeaderModule {}
