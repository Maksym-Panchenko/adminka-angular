import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import {AppFormsModule} from "@forms/forms.module";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "@shared/material/material.module";

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppFormsModule,
    MaterialModule
  ],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule { }
