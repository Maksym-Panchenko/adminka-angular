import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './message-dialog.component';
import {MaterialModule} from "@shared/material/material.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [MessageDialogComponent],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [MessageDialogComponent]
})
export class MessageDialogModule { }
