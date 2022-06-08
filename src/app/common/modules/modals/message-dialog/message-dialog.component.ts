import { Component, Inject, OnInit } from '@angular/core';
import { IMessageModal } from '@models/interfaces/modal/message-modal.inteface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MessageModalType} from "@models/enums/message-modal-type.enum";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IMessageModal) {}

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
}
