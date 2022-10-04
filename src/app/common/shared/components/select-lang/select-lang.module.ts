import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectLangComponent } from './select-lang.component';
import { MaterialModule } from '@shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SelectLangComponent],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [SelectLangComponent]
})
export class SelectLangModule {}
