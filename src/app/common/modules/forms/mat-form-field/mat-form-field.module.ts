import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldComponent } from './mat-form-field.component';
import {MaterialModule} from "../../../shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [MatFormFieldComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, MatInputModule],
  exports: [MatFormFieldComponent]
})
export class MatFormFieldModule {}
