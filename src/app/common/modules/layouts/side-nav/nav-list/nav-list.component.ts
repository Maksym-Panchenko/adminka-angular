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
      icon: 'posts',
      title: 'Posts'
    },
    {
      icon: 'photo',
      title: 'Albums'
    },
    {
      icon: 'text',
      title: 'Todos'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
