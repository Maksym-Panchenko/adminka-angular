import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {InputType} from "@models/enums/input-type.enum";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {MatFormFieldAppearance} from "@angular/material/form-field";

export enum FormFieldFloatLabelMode {
  auto = 'auto',
  always = 'always',
  never = 'never'
}

export interface IFormControls {
  [key: string]: AbstractControl;
}

@Component({
  selector: 'app-mat-form-field',
  templateUrl: './mat-form-field.component.html',
  styleUrls: ['./mat-form-field.component.scss']
})
export class MatFormFieldComponent implements OnInit, OnChanges, OnDestroy {
  // @ViewChild('inputElem') inputElem: ElementRef;
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
  // protected destroyed$: Subject<void> = new Subject<void>();

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
    switch (true) {
      case this.control.hasError('email'):
        return 'Wrong email address';
      case this.control.hasError('required'):
        return 'Enter value';
      default:
        return '';
    }
  }

  blur(): void {
    this.controlBlur.emit(this.control.value);
  }

  ngOnDestroy(): void {
    // this.destroyed$.next();
    // this.destroyed$.complete();
  }
}
