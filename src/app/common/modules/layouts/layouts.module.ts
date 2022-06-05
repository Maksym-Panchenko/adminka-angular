import { NgModule } from '@angular/core';
import {MainHeaderModule} from "./main-header/main-header.module";
import {SideNavModule} from "./side-nav/side-nav.module";

@NgModule({
  exports: [MainHeaderModule, SideNavModule]
})
export class LayoutsModule {}
