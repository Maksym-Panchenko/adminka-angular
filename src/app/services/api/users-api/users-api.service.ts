import { Injectable } from '@angular/core';
import {ApiBaseAbstractService} from "../../../misc/abstracts/api-base.abstract.service";
import {ITodo} from "@models/interfaces/todo.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService extends ApiBaseAbstractService<ITodo> {
  readonly entityUrl: string = 'users';
  readonly parentEntityUrl: string = '';

  getUsers(): Observable<any> {
    return this.http.get(`${this.basePath}users`);
  }
}
