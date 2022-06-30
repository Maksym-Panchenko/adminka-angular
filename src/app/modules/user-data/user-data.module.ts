import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './user-data.component';
import { SharedModule } from "@shared/shared.module";
import { AppFormsModule } from "@forms/forms.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [UserDataComponent],
  imports: [CommonModule, SharedModule, AppFormsModule, TranslateModule],
  exports: [UserDataComponent]
})
export class UserDataModule {}
