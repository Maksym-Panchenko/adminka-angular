import { Injectable } from '@angular/core';
import {IUser} from "@models/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  // setUserByEmail(email: string): void {
  //   const user: IUser | undefined = this._users.users.find(e => e.email === email);
  //   if (user) {
  //     this.setUser(user);
  //   }
  // }

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

  getUser(): IUser {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isLogin(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
  }
}
