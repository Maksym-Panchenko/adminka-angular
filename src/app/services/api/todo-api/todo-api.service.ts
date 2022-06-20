import { Injectable } from '@angular/core';
import {ApiBaseAbstractService} from "../../../misc/abstracts/api-base.abstract.service";
import {ITodo} from "@models/interfaces/todo.interface";

@Injectable({
  providedIn: 'root'
})
export class TodoApiService extends ApiBaseAbstractService<ITodo> {
  readonly entityUrl: string = 'todos';
  readonly parentEntityUrl: string = 'users';
}
