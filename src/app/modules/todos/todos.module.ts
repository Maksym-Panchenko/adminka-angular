import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import {SharedModule} from "@shared/shared.module";
import {ModalsModule} from "@modals/modals.module";
import {AppFormsModule} from "@forms/forms.module";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, SharedModule, ModalsModule, AppFormsModule, FormsModule, MatTableModule],
  exports: [TodosComponent]
})
export class TodosModule {}
