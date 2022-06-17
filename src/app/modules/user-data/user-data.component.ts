import { Component, OnInit } from '@angular/core';
import { UserService } from "@services/user/user.service";
import { BreadcrumbsService } from "@services/breadcrumbs/breadcrumbs.service";
import { ActivatedRoute } from "@angular/router";
import { UserApiService } from "@services/api/user-api/user-api.service";
import { IUser } from "@models/interfaces/user.interface";
import { InputType } from '@models/enums/input-type.enum';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  userId: number;
  user: IUser;
  isLoading: boolean = true;
  readonly InputType: typeof InputType = InputType;
  formGroup: FormGroup;

  fields = [
    {
      groupName: 'Personal info',
      id: 'personal',
      values: [
        { id: 'name', name: 'Name' },
        { id: 'username', name: 'Username' },
        { id: 'phone', name: 'Phone' },
        { id: 'email', name: 'Email' },
        { id: 'website', name: 'Web-site' }
      ],
    },
    {
      groupName: 'Address info',
      id: 'address',
      values: [
        { id: 'street', name: 'Street' },
        { id: 'suite', name: 'Suite' },
        { id: 'city', name: 'City' },
        { id: 'zipcode', name: 'Zip-code' }
      ]
    },
    {
      groupName: 'Company',
      id: 'company',
      values: [
        {id: 'name', name: 'Name' },
        {id: 'catchPhrase', name: 'Catch Phrase' },
        {id: 'bs', name: 'Bs' }
      ]
    }
  ];

  constructor(
    private _user: UserService,
    private _breadcrumbs: BreadcrumbsService,
    private _route: ActivatedRoute,
    private _userApi: UserApiService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userId = this._route?.parent?.snapshot.params['id'];
    this.getUser();
  }

  initForm() {
    const personal = this.fields.find(e => e.id === 'personal')?.values;

    this.formGroup = this._fb.group({
      personal: this._fb.group({
        name: [this.user.name, Validators.required],
        username: [this.user.username, Validators.required],
        phone: [this.user.phone, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        website: [this.user.website, Validators.required]
      }),
      address: this._fb.group({
        street: [this.user.address.street, Validators.required],
        suite: [this.user.address.suite, Validators.required],
        city: [this.user.address.city, Validators.required],
        zipcode: [this.user.address.zipcode, Validators.required]
      }),
      company: this._fb.group({
        name: [this.user.company.name, Validators.required],
        catchPhrase: [this.user.company.catchPhrase, Validators.required],
        bs: [this.user.company.bs, Validators.required]
      }),
    });
  }

  getUser(): void {
    this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
      this.user = user;
      this.initForm();console.log('user', this.user)
      this._setBreadcrumbs();
      this.isLoading = false;
    }, (error) => this.errorAction(error));
  }

  errorAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoading = false;
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {

      this._breadcrumbs.add({
        name: 'Users',
        url: `/users`
      });
      this._breadcrumbs.add({
        name: this.user.name,
        url: `/users/${this.user.id}`
      });
      this._breadcrumbs.add({
        name: 'Users data',
        url: ''
      });
    }
  }

  submit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const formData = this.formGroup.getRawValue();

    this.user = Object.assign(this.user, formData.personal);
    this.user.address = Object.assign(this.user.address, formData.address); // we are not change object - address.geo
    this.user.company = formData.company;

    this.isLoading = true;
    this._userApi.patchItem(this.userId, this.user).subscribe(() => {
      this.isLoading = false;
    }, (error) => this.errorAction(error));
  }
}
