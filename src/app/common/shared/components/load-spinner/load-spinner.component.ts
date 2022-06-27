import { Component, Input } from '@angular/core';
import { ProgressSpinnerMode } from "@angular/material/progress-spinner/progress-spinner";

@Component({
  selector: 'load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent {
  @Input() radius: number = 100;
  @Input() isLoading: boolean | null = false;
  @Input() mode: ProgressSpinnerMode;
}
