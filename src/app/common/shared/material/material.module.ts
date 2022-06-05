import { NgModule } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  exports: [
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
