import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {IPost} from "@models/interfaces/post.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { InputType } from '@models/enums/input-type.enum';
import {UserService} from "@services/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IPostModal} from "@models/interfaces/modal/post-modal.inteface";

type Mode = 'create' | 'edit';

@Component({
  selector: 'post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {
  @Input() mode: Mode;
  readonly InputType: typeof InputType = InputType;
  formGroup: FormGroup;
  post: IPost;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPostModal,
    private _formBuilder: FormBuilder,
    private _user: UserService,
    private _dialog: MatDialogRef<PostDialogComponent>
  ) {
    if (this.data.post) {
      this.post = this.data.post;
    } else {
      this.post = {
        title: '',
        body: '',
        id: Date.now(),
        userId: this._user.getUserId()
      }
    }
  }

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.formGroup = this._formBuilder.group({
      title: [this.post.title, Validators.required],
      body: [this.post.body, Validators.required]
    })
  }

  submit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    this.post.title = this.formGroup.controls['title'].value;
    this.post.body = this.formGroup.controls['body'].value;

    this._dialog.close(this.post);
  }

  get approveName(): string {
    return this.data?.buttonsNames?.approve ?? 'Ok';
  }

  get declineName(): string {
    return this.data?.buttonsNames?.decline ?? 'Cancel';
  }
}
