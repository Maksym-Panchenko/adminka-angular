import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IBreadcrumb} from "@models/interfaces/breadcrumbs/breadcrumbs.interface";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  // breadcrumbs$: BehaviorSubject<IBreadcrumb[]>;
  @Input() hidden: boolean;

    constructor(private _breadcrumbsService: BreadcrumbsService) {}

    ngOnInit(): void {
      // this.breadcrumbs$ = this._breadcrumbsService.breadcrumbs$;
    }
}
