import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightModeSwitcherComponent } from './light-mode-switcher.component';
import { MaterialModule } from '@shared/material/material.module';
import { AppFormsModule } from '@forms/forms.module';

@NgModule({
  declarations: [LightModeSwitcherComponent],
  imports: [CommonModule, MaterialModule, AppFormsModule],
  exports: [LightModeSwitcherComponent]
})
export class LightModeSwitcherModule {}
