import { Injectable } from '@angular/core';
import { IUser } from "@models/interfaces/user.interface";
import { Role } from "@models/enums/roles.enum";
import { ModeType } from "@models/enums/mode-type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setUser(user: IUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setRole(role: Role): void {
    localStorage.setItem('currentUserRole', JSON.stringify(role));
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

  getRole(): Role {
    return JSON.parse(localStorage.getItem('currentUserRole')!);
  }

  getMode(userId: number): ModeType {
    const isOwner: boolean = +JSON.parse(localStorage.getItem('currentUser')!)?.id === +userId;
    const isAdmin: boolean = JSON.parse(localStorage.getItem('currentUserRole')!) === Role.admin;
    return (isOwner || isAdmin) ? ModeType.edit : ModeType.view;
  }

  isLogin(): boolean {
    return !!localStorage.getItem('currentUserRole');
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserRole');
  }
}
