import { Component, Input } from '@angular/core';
import { BaseFormFieldAbstractComponent } from "@miscabstracts/base-form-field.abstract.component";

@Component({
  selector: 'mat-form-checkbox',
  templateUrl: './mat-form-checkbox.component.html',
  styleUrls: ['./mat-form-checkbox.component.scss']
})
export class MatFormCheckboxComponent extends BaseFormFieldAbstractComponent {
  @Input() color: 'primary' | 'accent' = 'primary';
  @Input() title: string;
  @Input() shouldStopPropagation: boolean;

  clickCheckbox(event: MouseEvent): void {
    const target: HTMLLinkElement = event.target as HTMLLinkElement;
    const isLink: boolean = !!target.closest('a');
    this.isLinkElement = isLink;

    if (isLink) {
      event.stopPropagation();
    }
  }
}
