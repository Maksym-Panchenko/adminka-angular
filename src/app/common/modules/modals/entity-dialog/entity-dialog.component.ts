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
import {IPhoto} from "@models/interfaces/photo.interface";
import {SnackBarNotificationType} from "@models/enums/snack-bar-notification-type.enum";
import {SNACKBAR_CONFIG} from "@miscconstants/snackbar-config";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  todo: ITodo;
  photo: IPhoto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEntityModal,
    private _formBuilder: FormBuilder,
    private _user: UserService,
    private _dialog: MatDialogRef<EntityDialogComponent>,
    private _snackBar: MatSnackBar
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

    if (this.data.entityType === EntityModalType.photo) {
      this.formGroup.addControl('url',this._formBuilder.control('https://via.placeholder.com/600/92c952', Validators.required));
      this.formGroup.addControl('thumbnailUrl',this._formBuilder.control('https://via.placeholder.com/150/92c952', Validators.required));
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

        if (this.data.submitHandler) {
          this.submitHandler(this.album);
        } else {
          this._dialog.close(true);
        }
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
        this.post.body = this.formGroup.controls['body'].value;

        if (this.data.submitHandler) {
          this.submitHandler(this.post);
        } else {
          this._dialog.close(true);
        }
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

        if (this.data.submitHandler) {
          this.submitHandler(this.todo);
        } else {
          this._dialog.close(true);
        }
        break;

      // add only
      case this.EntityModalType.photo:
        this.photo = {
          title: this.formGroup.controls['title'].value,
          albumId: this.data.albumId || 0,
          url: this.formGroup.controls['url'].value,
          thumbnailUrl: this.formGroup.controls['thumbnailUrl'].value
        };

        if (this.data.submitHandler) {
          this.submitHandler(this.photo);
        } else {
          this._dialog.close(true);
        }
        break;
    }
  }

  get approveName(): string {
    return this.data?.buttonsNames?.approve ?? 'Ok';
  }

  get declineName(): string {
    return this.data?.buttonsNames?.decline ?? 'Cancel';
  }

  submitHandler(item: ITodo | IPost | IAlbum | IPhoto): void {
    this.data.submitHandler(item).subscribe((answer: object): void => {
      this._dialog.close(answer);
    }, (error: Error): void => {
      console.log(error);
      this.showMessage(SnackBarNotificationType.error, 'Something wrong...');
    });
  }

  showMessage(result: SnackBarNotificationType, message: string) {
    this._snackBar.open(message, undefined, { ...SNACKBAR_CONFIG, panelClass: result });
  }
}
