import { Injectable } from '@angular/core';
import {IUser} from "@models/interfaces/user.interface";
import {UsersService} from "../users/users.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _users: UsersService) { }

  setUserByEmail(email: string): void {
    const user: IUser | undefined = this._users.users.find(e => e.email === email);
    if (user) {
      this.setUser(user);
    }
  }

  setUser(user: IUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserId(): number {
    const value: string | null = localStorage.getItem('currentUser');
    let user: IUser;
    if (value) {
      user = JSON.parse(value);
      return user.id;
    } else {
      return 0;
    }
  }

  getUser(): IUser | null {
    const value: string | null = localStorage.getItem('currentUser');
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  isLogin(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
  }
}
