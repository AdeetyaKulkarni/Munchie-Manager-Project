import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-good-trends',
  templateUrl: './good-trends.component.html',
  styleUrls: ['./good-trends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GoodTrendsComponent implements OnInit {
  // charts created following this guide 
  // https://medium.com/codingthesmartway-com-blog/angular-chart-js-with-ng2-charts-e21c8262777f

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  ngOnInit() {
  }

}
