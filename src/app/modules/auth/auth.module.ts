import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {SharedModule} from "../../common/shared/shared.module";
import {AppFormsModule} from "../../common/modules/forms/forms.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, SharedModule, AppFormsModule],
  exports: [AuthComponent]
})
export class AuthModule {}
