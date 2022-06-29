import { Component } from "@angular/core";
import { SnackBarNotificationType } from "@models/enums/snack-bar-notification-type.enum";
import { SNACKBAR_CONFIG } from "@miscconstants/snackbar-config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IUser } from "@models/interfaces/user.interface";
import { ModeType } from "@models/enums/mode-type";
import { UserService } from "@services/user/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  template: ''
})
export abstract class BaseItemAbstractComponent {
  userId: number;
  user: IUser;
  fullBreadCrumbs: boolean = true;
  readonly ModeType: typeof ModeType = ModeType;
  mode: ModeType;

  protected constructor(
    private _snackBar: MatSnackBar,
    private _user: UserService,
    private _route: ActivatedRoute,
  ) {}

  defineParams(): void {
    this.userId = this._route?.parent?.snapshot.params['id'];
    if (!this.userId) {
      this.fullBreadCrumbs = false;
      this.userId = this._user.getUserId();
    }
    this.mode = this._user.getMode(this.userId);
  }

  errorAction(error: Error): void {
    console.log('Error: ', error);
    this.showMessage(SnackBarNotificationType.error, 'Something wrong...');
  }

  showMessage(result: SnackBarNotificationType, message: string) {
    this._snackBar.open(message, undefined, { ...SNACKBAR_CONFIG, panelClass: result });
  }
}
