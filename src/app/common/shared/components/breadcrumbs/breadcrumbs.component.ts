import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBreadcrumb } from '@models/interfaces/breadcrumbs/breadcrumbs.interface';
import { BreadcrumbsService } from '@services/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs$: BehaviorSubject<IBreadcrumb[]>;
  @Input() hidden: boolean;
  maxTitleLength: number = 35;

  constructor(private _breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.breadcrumbs$ = this._breadcrumbsService.breadcrumbs$;
  }

  getShortTitle(title: string): string {
    if (!title) return '';
    return title?.length <= this.maxTitleLength ? title : title.slice(0, this.maxTitleLength) + '...';
  }
}
