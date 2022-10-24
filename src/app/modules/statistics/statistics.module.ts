import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, NgChartsModule, TranslateModule],
  exports: [StatisticsComponent]
})
export class StatisticsModule {}
