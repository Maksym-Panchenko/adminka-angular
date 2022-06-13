import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormCheckboxComponent } from './mat-form-checkbox.component';
import {MaterialModule} from "../../../shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [MatFormCheckboxComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
  exports: [MatFormCheckboxComponent]
})
export class MatFormCheckboxModule { }
