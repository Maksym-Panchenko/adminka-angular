import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "@shared/material/material.module";

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [UsersComponent]
})
export class UsersModule {}
