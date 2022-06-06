import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { InputType } from '@models/enums/input-type.enum';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Output() login: EventEmitter<void> = new EventEmitter();
  readonly InputType: typeof InputType = InputType;
  formGroup: FormGroup;

  bgUrl: string = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      isAgreed: [false, Validators.requiredTrue]
    })
  }

  signIn(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    this.login.emit();
  }
}
