import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputType } from '@models/enums/input-type.enum';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "@models/interfaces/user.interface";
import { UserApiService } from "@services/api/user-api/user-api.service";
import { UserService } from "@services/user/user.service";
import { Role } from "@models/enums/roles.enum";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Output() login: EventEmitter<string> = new EventEmitter();
  readonly InputType: typeof InputType = InputType;
  formGroup: FormGroup;
  wrongMail: boolean = false;
  users: IUser[];

  bgUrl: string = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
  emailList: string[];
  emailAdmin: string = 'admin@email.com'

  constructor(private _formBuilder: FormBuilder, private _user: UserService, private _userApi: UserApiService) {}

  ngOnInit(): void {
    this.getEmails();
    this.createForm();
  }

  getEmails(): void {
    this._userApi.getUsers().subscribe(users => {
      this.users = users;
      this.emailList = users.map((e: IUser): string => e.email);
      this.emailList.unshift(this.emailAdmin);
    })
  }

  createForm(): void {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      isAgreed: [false, Validators.requiredTrue]
    })
  }

  signIn(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    // check email
    const selectedUser = this.users.find(e => e.email === this.formGroup.get('email').value);
    const isAdmin = this.formGroup.get('email').value === this.emailAdmin;
    if (!selectedUser && !isAdmin) {
      this.formGroup.get('email').setValue('');
      this.wrongMail = true;
      return;
    }

    if (selectedUser) {
      this._user.setUser(selectedUser);
      this._user.setRole(Role.user);
    }

    if (isAdmin) {
      this._user.setRole(Role.admin);
    }

    this.login.emit();
  }

  selectEmail(email: string): void {
    this.formGroup.get('email').setValue(email);
  }
}
