import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chart.js'
import { Label } from 'ng2-charts';
import { BaseserviceService } from '../Services/baseservice.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

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
  public barChartLabels: Label[] = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [32, 48, 40, 33, 86], label: 'Menu Item' },
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

  response_data;

  // Date variables
  selectedDate: any;
  selectDate = new FormControl(new Date());

  showTable = false;

  constructor(private service: BaseserviceService, private datePipe: DatePipe) { }

  ngOnInit() {
  }


  selectEvent(event: any) {
    this.selectedDate = this.datePipe.transform(this.selectDate.value, "yyyyMMdd");
    this.selectedDate = Number(this.selectedDate);

    if (event) {
      this.service.GetRestaurantTrends(localStorage.getItem("user_id"), this.selectedDate).subscribe(
        response => {
          this.response_data = response;
          console.log(response);
        },
        error => { console.log(error) }
      )
      this.showTable = true;
    }

    if(this.response_data) {
      console.log("got to here");
      // this.barChartLabels = this.response_data.data.labels
      // this.barChartData = [
      //  { data: this.response_data.data, label: 'Menu Item' },
      // ];
    }
  }

}