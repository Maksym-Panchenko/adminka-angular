import { Injectable } from '@angular/core';
import {User} from "@models/interfaces/user.interface";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[];
  load$: Subject<User[]> = new Subject();

  constructor() {
    this.load();
  }

  load(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        this.users = json;
        this.load$.next(this.users);
      });
  }

  getEmailList(): string[] {
    return this.users.map((e: User): string => e.email);
  }
}
