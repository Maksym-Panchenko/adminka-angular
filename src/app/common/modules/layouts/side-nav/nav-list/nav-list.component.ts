import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from '@models/interfaces/nav-item.interface';
import { Role } from '@models/enums/roles.enum';

@Component({
  selector: 'nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {
  @Input() currentRole: Role;
  navItemsShow: NavItem[];
  navItems: NavItem[] = [
    {
      icon: 'users',
      title: 'USERS',
      link: '/users',
      roles: [Role.user, Role.admin]
    },
    {
      icon: 'users',
      title: 'MY_DATA',
      link: '/user-data',
      roles: [Role.user]
    },
    {
      icon: 'posts',
      title: 'MY_POSTS',
      link: '/posts',
      roles: [Role.user]
    },
    {
      icon: 'photo',
      title: 'MY_ALBUMS',
      link: '/albums',
      roles: [Role.user]
    },
    {
      icon: 'text',
      title: 'MY_TODOS',
      link: '/todos',
      roles: [Role.user]
    }
  ];

  ngOnInit(): void {
    this.navItemsShow = this.navItems.filter(el => el.roles?.includes(this.currentRole));
  }
}
