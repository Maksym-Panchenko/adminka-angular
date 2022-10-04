import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { AppFormsModule } from '@forms/forms.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, SharedModule, AppFormsModule, TranslateModule],
  exports: [AuthComponent]
})
export class AuthModule {}
