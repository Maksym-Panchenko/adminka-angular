import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './user-data.component';
import { SharedModule } from "../../common/shared/shared.module";
import { AppFormsModule } from "../../common/modules/forms/forms.module";

@NgModule({
  declarations: [UserDataComponent],
  imports: [CommonModule, SharedModule, AppFormsModule],
  exports: [UserDataComponent]
})
export class UserDataModule {}
