import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'mat-form-checkbox',
  templateUrl: './mat-form-checkbox.component.html',
  styleUrls: ['./mat-form-checkbox.component.scss']
})
export class MatFormCheckboxComponent implements OnInit {
  @Output() controlChange: EventEmitter<string> = new EventEmitter();
  @Input() color: 'primary' | 'accent' = 'primary';
  @Input() title: string;
  @Input() shouldStopPropagation: boolean;
  @Input() disabled: boolean = false;
  @Input() control: AbstractControl = new FormControl();
  isLinkElement: boolean = false;

  constructor(protected cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  focusOut(): void {
    if (this.isLinkElement) {
      this.control.markAsUntouched();
    }
  }

  clickCheckbox(event: MouseEvent): void {
    const target: HTMLLinkElement = event.target as HTMLLinkElement;
    const isLink: boolean = !!target.closest('a');
    this.isLinkElement = isLink;

    if (isLink) {
      event.stopPropagation();
    }
  }

  get errorMessage(): string {

    switch (true) {
      case this.control.hasError('required'):
        return 'You must check it';
      default:
        return '';
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

    // if (control?.currentValue instanceof AbstractControl) {
    //   zip(control.currentValue.valueChanges, control.currentValue.statusChanges)
    //     .pipe(takeUntil(this.destroyed$))
    //     .subscribe((): void => this.cdr.detectChanges());
    // }

    if (value) {
      this.control.setValue(value?.currentValue);
    }

    this.cdr.detectChanges();
  }
}
