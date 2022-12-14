import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { UserDataComponent } from './user-data/user-data.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SideNavComponent, UserDataComponent, NavListComponent],
  imports: [CommonModule, MatIconModule, RouterModule, TranslateModule],
  exports: [SideNavComponent]
})
export class SideNavModule {}
