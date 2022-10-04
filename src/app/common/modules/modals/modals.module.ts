import { NgModule } from '@angular/core';
import { MessageDialogModule } from './message-dialog/message-dialog.module';
import { EntityDialogModule } from './entity-dialog/entity-dialog.module';

@NgModule({
  exports: [MessageDialogModule, EntityDialogModule]
})
export class ModalsModule {}
