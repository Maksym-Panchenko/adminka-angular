import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { Subject } from "rxjs";

export enum FormFieldFloatLabelMode {
  auto = 'auto',
  always = 'always',
  never = 'never'
}

export interface IFormControls {
  [key: string]: AbstractControl;
}

@Component({
  template: ''
})
export abstract class BaseFormFieldAbstractComponent implements OnInit, OnChanges, OnDestroy {
  @Output() controlChange: EventEmitter<string> = new EventEmitter();
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() control: AbstractControl = new FormControl();
  @Input() floatLabel: FormFieldFloatLabelMode = FormFieldFloatLabelMode.never;
  @Input() value: string = '';

  isLinkElement: boolean = false;
  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.value) {
      this.control.setValue(this.value, { emitEvent: false });
    }
    this.control?.valueChanges?.subscribe(this.controlChange.emit.bind(this.controlChange));
  }

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  get isRequired(): boolean {
    const required: boolean = this.control.validator && this.control.validator(this.control)?.['required'];
    return required ?? this.required;
  }

  focusOut(): void {
    if (this.isLinkElement) {
      this.control.markAsUntouched();
    }
  }

  ngOnChanges({ value, disabled, control }: SimpleChanges): void {
    if (disabled && typeof disabled.currentValue === 'boolean') {
      if (this.disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }

    if (value) {
      this.control.setValue(value?.currentValue);
    }

    this.cdr.detectChanges();
  }

  get errorMessage(): string {

    switch (true) {
      case this.control.hasError('required'):
        return 'Required field';
      case this.control.hasError('email'):
        return 'Wrong email address';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
