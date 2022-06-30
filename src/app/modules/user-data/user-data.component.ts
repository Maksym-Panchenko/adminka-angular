import {Component, OnInit} from '@angular/core';
import {UserService} from "@services/user/user.service";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import {ActivatedRoute} from "@angular/router";
import {UserApiService} from "@services/api/user-api/user-api.service";
import {IUser} from "@models/interfaces/user.interface";
import {InputType} from '@models/enums/input-type.enum';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModeType} from "@models/enums/mode-type";
import {BaseItemAbstractComponent} from "@misc/abstracts/base-item.abstract.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarNotificationType} from "@models/enums/snack-bar-notification-type.enum";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent extends BaseItemAbstractComponent implements OnInit {
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
    snackBar: MatSnackBar,
    user: UserService,
    route: ActivatedRoute,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService,
    private _fb: FormBuilder
  ) {
    super(snackBar, user, route);
  }

  ngOnInit(): void {
    this.defineParams();

    this.getUser();
  }

  initForm() {
    const isDisabled = this.mode !== ModeType.edit;

    this.formGroup = this._fb.group({
      personal: this._fb.group({
        name: [{value: this.user.name, disabled: isDisabled}, Validators.required],
        username: [{value: this.user.username, disabled: isDisabled}, Validators.required],
        phone: [{value: this.user.phone, disabled: isDisabled}, Validators.required],
        email: [{value: this.user.email, disabled: isDisabled}, [Validators.required, Validators.email]],
        website: [{value: this.user.website, disabled: isDisabled}, Validators.required]
      }),
      address: this._fb.group({
        street: [{value: this.user.address.street, disabled: isDisabled}, Validators.required],
        suite: [{value: this.user.address.suite, disabled: isDisabled}, Validators.required],
        city: [{value: this.user.address.city, disabled: isDisabled}, Validators.required],
        zipcode: [{value: this.user.address.zipcode, disabled: isDisabled}, Validators.required]
      }),
      company: this._fb.group({
        name: [{value: this.user.company.name, disabled: isDisabled}, Validators.required],
        catchPhrase: [{value: this.user.company.catchPhrase, disabled: isDisabled}, Validators.required],
        bs: [{value: this.user.company.bs, disabled: isDisabled}, Validators.required]
      }),
    });
  }

  getUser(): void {
    this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
      this.user = user;
      this.initForm();
      this._setBreadcrumbs();
    }, (error) => this.errorAction(error));
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {

      if (this.fullBreadCrumbs) {
        this._breadcrumbs.add({
          name: 'Users',
          url: `/users`
        });
        this._breadcrumbs.add({
          name: this.user.name,
          url: `/users/${this.user.id}`
        });
      }

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

    this._userApi.patchItem(this.userId, this.user).subscribe((answer) => {
      if (answer) {
        this.showMessage(SnackBarNotificationType.success, 'User data has been edited');
      }
    }, (error) => this.errorAction(error));
  }
}
