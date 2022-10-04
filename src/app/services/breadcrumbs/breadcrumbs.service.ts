import { Injectable, OnDestroy } from '@angular/core';
import { IBreadcrumbDataWithId } from '@models/interfaces/breadcrumbs/breadcrumb-data-with-id.interface';
import { ActivatedRouteSnapshot, ActivationEnd, Event, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { BehaviorSubject, buffer, Observable, Subscription } from 'rxjs';
import { IBreadcrumb } from '@models/interfaces/breadcrumbs/breadcrumbs.interface';
import { filter, map } from 'rxjs/operators';

type CheckFunction = (event: Event) => boolean;
const isNavigationEnd: CheckFunction = (event: Event): event is NavigationEnd => event instanceof NavigationEnd;
const isActivationEnd: CheckFunction = (event: Event): event is ActivationEnd => event instanceof ActivationEnd;

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService implements OnDestroy {
  private _routerEventsSubscription: Subscription;
  private _collection: IBreadcrumb[];
  private readonly _bcForDisplay$: BehaviorSubject<IBreadcrumb[]>;
  private readonly _ID_MASK: string = ':id';

  constructor(private _router: Router) {
    this._bcForDisplay$ = new BehaviorSubject<IBreadcrumb[]>([]);
    const navigationEnd$: Observable<Event> = this._router.events.pipe(filter(isNavigationEnd));

    this._routerEventsSubscription = this._router.events
      .pipe(
        filter(isActivationEnd),
        map((event: Event) => (event as ActivationEnd).snapshot),
        buffer<ActivatedRouteSnapshot>(navigationEnd$),
        map<ActivatedRouteSnapshot[], ActivatedRouteSnapshot[]>((bcData: ActivatedRouteSnapshot[]): ActivatedRouteSnapshot[] =>
          bcData.reverse()
        ),
        map<ActivatedRouteSnapshot[], IBreadcrumbDataWithId>((bcData: ActivatedRouteSnapshot[]): IBreadcrumbDataWithId => {
          const foundParams: string[] = bcData
            .filter((data: ActivatedRouteSnapshot): string => data.params.id)
            .map((data: ActivatedRouteSnapshot): string => data.params.id);
          return {
            bcData,
            id: foundParams[0]
          };
        })
      )
      .subscribe(({ bcData, id }: IBreadcrumbDataWithId): void => {
        const bcLoadedData: ActivatedRouteSnapshot[] = bcData.filter(({ data }: ActivatedRouteSnapshot): string => data['breadcrumb']);
        this._collection = bcLoadedData.reduce((rootAcc: IBreadcrumb[], { data, pathFromRoot }: ActivatedRouteSnapshot): IBreadcrumb[] => {
          let breadcrumb: IBreadcrumb | undefined;

          if (data['breadcrumb'] === this._ID_MASK && id !== undefined) {
            data['breadcrumb'] = id;
          }

          if (data['breadcrumb'] && !rootAcc.some((item: IBreadcrumb): boolean => data['breadcrumb'] === item.name)) {
            breadcrumb = {
              name: data['breadcrumb'],
              url: pathFromRoot
                .map((v: ActivatedRouteSnapshot): string => v.url.map((segment: UrlSegment): string => segment.toString()).join('/'))
                .join('/')
            };
          }
          return breadcrumb ? [...rootAcc, breadcrumb] : [...rootAcc];
        }, []);

        this._bcForDisplay$.next(this._collection);
      });
  }

  get breadcrumbs$(): BehaviorSubject<IBreadcrumb[]> {
    return this._bcForDisplay$;
  }

  add(breadcrumb: IBreadcrumb): void {
    this._collection.push(breadcrumb);
    this._bcForDisplay$.next(this._collection);
  }

  update(): void {
    this._bcForDisplay$.next(this._collection);
  }

  ngOnDestroy(): void {
    this._routerEventsSubscription.unsubscribe();
  }
}
