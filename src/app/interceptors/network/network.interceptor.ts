import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '@services/spinner/spinner.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private _spinner: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._spinner.show();
    return next.handle(request).pipe(
      finalize(() => {
        this._spinner.hide();
      })
    );
  }
}
