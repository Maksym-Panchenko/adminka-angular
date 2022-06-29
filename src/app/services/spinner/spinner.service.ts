import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {LoadSpinnerComponent} from "@shared/components/load-spinner/load-spinner.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  private overlayRef: OverlayRef;

  constructor(private _overlay: Overlay) {}

  show() {
    this._loading.next(true);

    if (!this.overlayRef) {
      this.overlayRef = this._overlay.create();
    }

    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new ComponentPortal(LoadSpinnerComponent));
    }
  }

  hide() {
    this._loading.next(false);

    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
