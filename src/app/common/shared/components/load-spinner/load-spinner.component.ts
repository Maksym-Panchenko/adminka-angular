import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent implements OnInit {
  @Input() radius: number = 100;
  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
