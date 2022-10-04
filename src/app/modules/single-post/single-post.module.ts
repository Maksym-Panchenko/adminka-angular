import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePostComponent } from './single-post.component';
import { SharedModule } from '@shared/shared.module';
import { ModalsModule } from '@modals/modals.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SinglePostComponent],
  imports: [CommonModule, SharedModule, ModalsModule, TranslateModule],
  exports: [SinglePostComponent]
})
export class SinglePostModule {}
