import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDialogComponent } from './entity-dialog.component';
import {AppFormsModule} from "@forms/forms.module";
import {MaterialModule} from "@shared/material/material.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [EntityDialogComponent],
  imports: [CommonModule, AppFormsModule, MaterialModule, TranslateModule],
  exports: [EntityDialogComponent]
})
export class EntityDialogModule {}
