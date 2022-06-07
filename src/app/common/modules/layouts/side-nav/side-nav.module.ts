import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { UserDataComponent } from './user-data/user-data.component';
import { NavListComponent } from './nav-list/nav-list.component';
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [SideNavComponent, UserDataComponent, NavListComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [SideNavComponent]
})
export class SideNavModule {}
