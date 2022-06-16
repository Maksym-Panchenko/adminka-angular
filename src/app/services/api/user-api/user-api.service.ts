import { Injectable } from '@angular/core';
import { ApiBaseAbstractService } from "@misc/abstracts/api-base.abstract.service";
import { Observable } from "rxjs";
import { IUser } from "@models/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends ApiBaseAbstractService<IUser> {
  readonly entityUrl: string = 'users';
  readonly parentEntityUrl: string = '';

  getUsers(): Observable<any> {
    return this.http.get(`${this.basePath}users`);
  }
}
