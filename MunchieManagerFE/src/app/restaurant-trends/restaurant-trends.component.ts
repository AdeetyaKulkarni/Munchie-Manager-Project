import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chart.js'
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-restaurant-trends',
  templateUrl: './restaurant-trends.component.html',
  styleUrls: ['./restaurant-trends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RestaurantTrendsComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  
  public barChartData: ChartDataSets[] = [
    { data: [30, 48, 40, 33, 86, 65, 72], label: 'item 1' },
    { data: [60, 69, 35, 25, 44, 42, 45], label: 'item 2' },
    { data: [55, 36, 69, 52, 33, 27, 90], label: 'item 3' },
    { data: [49, 84, 78, 19, 60, 53, 30], label: 'item 4' },
    { data: [29, 55, 24, 72, 55, 32, 33], label: 'item 5' },
    { data: [36, 73, 86, 69, 67, 80, 56], label: 'item 6' },
  ];

  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(51,153,50,1)',
      borderColor: 'rgba(51,153,50,1)',
      pointBackgroundColor: 'rgba(51,153,50,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,1)'
    },
    { // second color
      backgroundColor: 'rgba(51,153,50,0.9)',
      borderColor: 'rgba(51,153,50,0.9)',
      pointBackgroundColor: 'rgba(51,153,50,0.9)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.9)'
    },
    { // third color
      backgroundColor: 'rgba(51,153,50,0.8)',
      borderColor: 'rgba(51,153,50,0.8)',
      pointBackgroundColor: 'rgba(51,153,50,0.8)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.8)'
    },
    { // fourth color
      backgroundColor: 'rgba(51,153,50,0.7)',
      borderColor: 'rgba(51,153,50,0.7)',
      pointBackgroundColor: 'rgba(51,153,50,0.7)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.7)'
    },
    { // fifth color
      backgroundColor: 'rgba(51,153,50,0.6)',
      borderColor: 'rgba(51,153,50,0.6)',
      pointBackgroundColor: 'rgba(51,153,50,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.6)'
    },
    { // sixth color
      backgroundColor: 'rgba(51,153,50,0.5)',
      borderColor: 'rgba(51,153,50,0.5)',
      pointBackgroundColor: 'rgba(51,153,50,0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.5)'
    },
    { // seventh color
      backgroundColor: 'rgba(51,153,50,0.4)',
      borderColor: 'rgba(51,153,50,0.4)',
      pointBackgroundColor: 'rgba(51,153,50,0.4)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.4)'
    }];

  constructor() { }

  ngOnInit() {
  }

}
