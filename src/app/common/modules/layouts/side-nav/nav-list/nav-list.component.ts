import { Component, OnInit } from '@angular/core';

type NavItem = {
  icon: string;
  title: string;
  link?: string;
}

@Component({
  selector: 'nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
