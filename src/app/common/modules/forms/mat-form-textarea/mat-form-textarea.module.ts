import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormTextareaComponent } from './mat-form-textarea.component';
import {MaterialModule} from "@shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [MatFormTextareaComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, MatInputModule],
  exports: [MatFormTextareaComponent]
})
export class MatFormTextareaModule { }
