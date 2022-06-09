import { NgModule } from '@angular/core';
import { MatFormFieldModule } from './mat-form-field/mat-form-field.module';
import {MatFormCheckboxModule} from "./mat-form-checkbox/mat-form-checkbox.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormTextareaModule} from "./mat-form-textarea/mat-form-textarea.module";

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormCheckboxModule,
    MatFormTextareaModule
  ]
})
export class AppFormsModule {}
