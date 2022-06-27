import { Component, Inject } from '@angular/core';
import { IMessageModal } from '@models/interfaces/modal/message-modal.inteface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageModalType } from "@models/enums/message-modal-type.enum";
import { SnackBarNotificationType } from "@models/enums/snack-bar-notification-type.enum";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACKBAR_CONFIG } from "@miscconstants/snackbar-config";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMessageModal,
    private _dialog: MatDialogRef<MessageDialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  get isConfirmModal(): boolean {
    return (this.data.type ?? MessageModalType.alert) === MessageModalType.confirm;
  }

  get isAlertModal(): boolean {
    return (this.data.type ?? MessageModalType.alert) === MessageModalType.alert;
  }

  get approveName(): string {
    return this.data?.buttonsNames?.approve ?? 'Ok';
  }

  get declineName(): string {
    return this.data?.buttonsNames?.decline ?? 'Cancel';
  }

  approveDialog() {
    if (this.data.submitHandler) {
      this.data.submitHandler().subscribe((answer: object): void => {
        this._dialog.close(answer);
      }, (error: Error): void => {
        console.log(error);
        this.showMessage(SnackBarNotificationType.error, 'Something wrong...');
        this._dialog.close(false);
      });
    }
  }

  showMessage(result: SnackBarNotificationType, message: string) {
    this._snackBar.open(message, undefined, { ...SNACKBAR_CONFIG, panelClass: result });
  }
}
