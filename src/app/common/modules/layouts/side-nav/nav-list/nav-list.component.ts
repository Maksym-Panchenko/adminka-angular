import { Component, OnInit } from '@angular/core';
import { NavItem } from "@models/interfaces/nav-item.interface";

@Component({
  selector: 'nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent {
  navItems: NavItem[] = [
    {
      icon: 'users',
      title: 'Users',
      link: '/users'
    },
    {
      icon: 'posts',
      title: 'My posts',
      link: '/posts'
    },
    {
      icon: 'photo',
      title: 'My albums',
      link: '/albums'
    },
    {
      icon: 'text',
      title: 'My todos',
      link: '/todos'
    }
  ];
}
