import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  exports: [SharedComponentsModule, MaterialModule]
})
export class SharedModule {}
