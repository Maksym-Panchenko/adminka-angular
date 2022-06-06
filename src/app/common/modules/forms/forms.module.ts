import { NgModule } from '@angular/core';
import { MatFormFieldModule } from './mat-form-field/mat-form-field.module';
import {MatFormCheckboxModule} from "./mat-form-checkbox/mat-form-checkbox.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormCheckboxModule
  ]
})
export class AppFormsModule {}
