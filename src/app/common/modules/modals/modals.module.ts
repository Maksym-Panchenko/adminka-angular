import { NgModule } from '@angular/core';
import {MessageDialogModule} from "./message-dialog/message-dialog.module";
import {PostDialogModule} from "./post-dialog/post-dialog.module";

@NgModule({
  exports: [MessageDialogModule, PostDialogModule]
})
export class ModalsModule {}
