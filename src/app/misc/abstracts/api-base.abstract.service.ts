import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

enum ApiOperation {
  delete = 'delete',
  create = 'create',
  update = 'update',
  singleItem = 'singleItem',
  items = 'items',
  patch = 'patch'
}

export interface IEntity {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export abstract class ApiBaseAbstractService<T> {
  readonly basePath: string = 'https://jsonplaceholder.typicode.com/';
  abstract readonly entityUrl: string;
  abstract readonly parentEntityUrl: string;

  protected constructor(protected http: HttpClient) {}

  getFullPath(operation: ApiOperation, id: number = 0, ): string {
    switch (operation) {
      case ApiOperation.delete:
      case ApiOperation.update:
      case ApiOperation.patch:
      case ApiOperation.singleItem:
        return `${this.basePath}${this.entityUrl}/${id}`;

      case ApiOperation.create:
        return `${this.basePath}${this.entityUrl}`;

      case ApiOperation.items:
        return `${this.basePath}${this.parentEntityUrl}/${id}/${this.entityUrl}`;
    }
  }

  deleteItem(id: number): Observable<Object> {
    return this.http.delete(this.getFullPath(ApiOperation.delete, id));
  }

  createItem(item: Partial<T>): Observable<T> {
    return this.http.post<T>(this.getFullPath(ApiOperation.create), item);
  }

  updateItem(item: Partial<T> & IEntity): Observable<T> {
    return this.http.put<T>(this.getFullPath(ApiOperation.update, item.id), item);
  }
  // partial
  patchItem(id: number, item: Partial<T>): Observable<T> {
    return this.http.put<T>(this.getFullPath(ApiOperation.update, id), item);
  }

  getItem(id: number): Observable<T> {
    return this.http.get<T>(this.getFullPath(ApiOperation.singleItem, id));
  }

  getItems(userId: number): Observable<T[]> {
    return this.http.get<T[]>(this.getFullPath(ApiOperation.items, userId));
  }
}
