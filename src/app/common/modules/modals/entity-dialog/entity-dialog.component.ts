import {Component, Inject, OnInit} from '@angular/core';
import {IPost} from "@models/interfaces/post.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputType} from '@models/enums/input-type.enum';
import {UserService} from "@services/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {IAlbum} from "@models/interfaces/album.interface";
import {ITodo} from "@models/interfaces/todo.interface";

@Component({
  selector: 'entity-dialog',
  templateUrl: './entity-dialog.component.html',
  styleUrls: ['./entity-dialog.component.scss']
})
export class EntityDialogComponent implements OnInit {
  readonly InputType: typeof InputType = InputType;
  readonly EntityModalType: typeof EntityModalType = EntityModalType;
  formGroup: FormGroup;
  post: IPost;
  album: IAlbum;
  todo: ITodo

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEntityModal,
    private _formBuilder: FormBuilder,
    private _user: UserService,
    private _dialog: MatDialogRef<EntityDialogComponent>
  ) {}

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    const title = this.data.post?.title || this.data.album?.title || this.data.todo?.title || '';

    this.formGroup = this._formBuilder.group({
      title: [title, Validators.required],
    });

    if (this.data.entityType === EntityModalType.post) {
      this.formGroup.addControl('body',this._formBuilder.control(this.data.post?.body || '', Validators.required));
    }
  }

  submit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    switch (this.data.entityType) {
      case this.EntityModalType.album:
        if (this.data.album) {
          this.album = this.data.album;
        } else {
          this.album = {
            title: '',
            userId: this._user.getUserId()
          }
        }
        this.album.title = this.formGroup.controls['title'].value;
        this._dialog.close(this.album);
        break;

      case this.EntityModalType.post:
        if (this.data.post) {
          this.post = this.data.post;
        } else {
          this.post = {
            title: '',
            body: '',
            userId: this._user.getUserId()
          }
        }
        this.post.title = this.formGroup.controls['title'].value;
        this.post.body = this.formGroup.controls['body'].value;console.log(this.post)
        this._dialog.close(this.post);
        break;

      case this.EntityModalType.todo:
        if (this.data.todo) {
          this.todo = this.data.todo;
        } else {
          this.todo = {
            title: '',
            completed: false,
            userId: this._user.getUserId()
          }
        }
        this.todo.title = this.formGroup.controls['title'].value;
        this._dialog.close(this.todo);
        break;
    }
  }

  get approveName(): string {
    return this.data?.buttonsNames?.approve ?? 'Ok';
  }

  get declineName(): string {
    return this.data?.buttonsNames?.decline ?? 'Cancel';
  }
}
