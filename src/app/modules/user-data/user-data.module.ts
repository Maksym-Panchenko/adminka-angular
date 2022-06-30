import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './user-data.component';
import { SharedModule } from "@shared/shared.module";
import { AppFormsModule } from "@forms/forms.module";

@NgModule({
  declarations: [UserDataComponent],
  imports: [CommonModule, SharedModule, AppFormsModule],
  exports: [UserDataComponent]
})
export class UserDataModule {}
