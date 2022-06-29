import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputType } from "@models/enums/input-type.enum";
import { FormGroup } from "@angular/forms";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { BaseFormFieldAbstractComponent, IFormControls } from "@misc/abstracts/base-form-field.abstract.component";

@Component({
  selector: 'app-mat-form-field',
  templateUrl: './mat-form-field.component.html',
  styleUrls: ['./mat-form-field.component.scss']
})
export class MatFormFieldComponent extends BaseFormFieldAbstractComponent {
  @Output() controlBlur: EventEmitter<any> = new EventEmitter<any>();
  @Input() inputType: InputType;
  @Input() placeholder: string;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  formGroup: FormGroup;

  get form(): IFormControls {
    return this.formGroup?.controls;
  }

  blur(): void {
    this.controlBlur.emit(this.control.value);
  }
}
