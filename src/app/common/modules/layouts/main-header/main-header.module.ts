import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { MaterialModule } from "@shared/material/material.module";
import {SelectLangModule} from "@shared/components/select-lang/select-lang.module";

@NgModule({
  declarations: [MainHeaderComponent],
  imports: [CommonModule, MaterialModule, SelectLangModule],
  exports: [MainHeaderComponent]
})
export class MainHeaderModule {}
