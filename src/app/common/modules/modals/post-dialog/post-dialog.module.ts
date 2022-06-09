import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDialogComponent } from './post-dialog.component';
import {AppFormsModule} from "../../forms/forms.module";
import {MaterialModule} from "../../../shared/material/material.module";

@NgModule({
  declarations: [PostDialogComponent],
  imports: [CommonModule, AppFormsModule, MaterialModule],
  exports: [PostDialogComponent]
})
export class PostDialogModule {}
