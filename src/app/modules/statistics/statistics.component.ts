import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { IPost } from '@models/interfaces/post.interface';
import { PostApiService } from '@services/api/post-api/post-api.service';
import { BaseItemAbstractComponent } from '@misc/abstracts/base-item.abstract.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseChartDirective } from 'ng2-charts';
import { BreadcrumbsService } from '@services/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseItemAbstractComponent implements OnInit {
  @ViewChild(BaseChartDirective) private _chart: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        fill: false,
        tension: 0, // curve
        borderColor: '#3F51B5', // line color
        backgroundColor: '#3F51B5', // bg legend
        pointRadius: 6,
        pointBorderColor: '#3F51B5',
        pointBackgroundColor: 'white',
        pointBorderWidth: 2
      },
      {
        data: [],
        label: '',
        fill: false,
        tension: 0,
        borderColor: '#66788A',
        backgroundColor: '#66788A',
        pointRadius: 6,
        pointBorderColor: '#66788A',
        pointBackgroundColor: 'white',
        pointBorderWidth: 2
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1 / 2,
    resizeDelay: 250,
    scales: {
      y: {
        grid: {
          display: false
        }
      }
    }
  };
  public lineChartLegend = true;

  constructor(
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    user: UserService,
    translate: TranslateService,
    private _postApi: PostApiService,
    private _breadcrumbs: BreadcrumbsService
  ) {
    super(snackBar, user, route, translate);
  }

  ngOnInit(): void {
    this.defineParams();

    this.getPosts();
    this._setBreadcrumbs();

    this.lineChartData.datasets[0].label = this._translate.instant(`CHART.TITLE`);
    this.lineChartData.datasets[1].label = this._translate.instant(`CHART.BODY`);
  }

  getPosts(): void {
    this._postApi.getItems(this.userId).subscribe((posts: IPost[]): void => this.updateData(posts));
  }

  updateData(posts: IPost[]): void {
    this.lineChartData.labels = posts.map((post: IPost): number => post.id);
    this.lineChartData.datasets[0].data = posts.map((post: IPost): number => post.title.length);
    this.lineChartData.datasets[1].data = posts.map((post: IPost): number => post.body.length);

    this._chart.update();
  }

  private _setBreadcrumbs(): void {
    this._breadcrumbs.add({
      name: 'BREAD_CRUMBS.STATISTICS',
      url: ''
    });
  }
}
