import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {InputType} from "@models/enums/input-type.enum";
import {MatFormFieldAppearance} from "@angular/material/form-field";
import {AbstractControl, FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {FormFieldFloatLabelMode, IFormControls} from "../mat-form-field/mat-form-field.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-mat-form-textarea',
  templateUrl: './mat-form-textarea.component.html',
  styleUrls: ['./mat-form-textarea.component.scss']
})
export class MatFormTextareaComponent implements OnInit, OnChanges, OnDestroy {
  @Output() controlChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() controlBlur: EventEmitter<any> = new EventEmitter<any>();
  @Input() inputType: InputType;
  @Input() placeholder: string;
  @Input() required: boolean = false;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() control: AbstractControl = new FormControl();
  @Input() floatLabel: FormFieldFloatLabelMode = FormFieldFloatLabelMode.never;
  @Input() value: string = '';
  formGroup: FormGroup;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() minRows: number = 3;
  @Input() maxRows: number = 6;
  @Input() formRef: FormGroupDirective;

  constructor(protected cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.value) {
      this.control.setValue(this.value, { emitEvent: false });
    }
    this.control?.valueChanges?.subscribe(this.controlChange.emit.bind(this.controlChange));
  }

  ngOnChanges({ value, disabled, placeholder, control }: SimpleChanges): void {
    if (value) {
      this.control.setValue(value?.currentValue, { emitEvent: false });
    }

    this.cdr.detectChanges();
  }

  get form(): IFormControls {
    return this.formGroup?.controls;
  }

  get isRequired(): boolean {
    const required: boolean = this.control.validator && this.control.validator(this.control)?.['required'];
    return required ?? this.required;
  }

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  get errorMessage(): string {
    return this.control.hasError('required') ? 'Enter value' : '';
  }

  ngOnDestroy(): void {
    // this.destroyed$.next();
    // this.destroyed$.complete();
  }

}
