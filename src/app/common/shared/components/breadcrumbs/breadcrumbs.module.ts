import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import {AppFormsModule} from "../../../modules/forms/forms.module";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../material/material.module";

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppFormsModule,
    MaterialModule,
    // DirectivesModule,
    // PipesModule
  ],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule { }
