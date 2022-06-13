import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './message-dialog.component';
import {MaterialModule} from "../../../shared/material/material.module";

@NgModule({
  declarations: [MessageDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MessageDialogComponent]
})
export class MessageDialogModule { }
