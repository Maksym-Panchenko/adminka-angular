import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputType } from "@models/enums/input-type.enum";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { BaseFormFieldAbstractComponent, IFormControls } from "@miscabstracts/base-form-field.abstract.component";

@Component({
  selector: 'app-mat-form-textarea',
  templateUrl: './mat-form-textarea.component.html',
  styleUrls: ['./mat-form-textarea.component.scss']
})
export class MatFormTextareaComponent extends BaseFormFieldAbstractComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Output() controlBlur: EventEmitter<any> = new EventEmitter<any>();
  @Input() inputType: InputType;
  @Input() placeholder: string;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() minRows: number = 3;
  @Input() maxRows: number = 6;
  @Input() formRef: FormGroupDirective;
  formGroup: FormGroup;

  get form(): IFormControls {
    return this.formGroup?.controls;
  }
}
