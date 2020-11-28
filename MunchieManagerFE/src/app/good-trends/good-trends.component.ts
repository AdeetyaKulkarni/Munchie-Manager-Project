import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chart.js'
import { Label } from 'ng2-charts';
import { BaseserviceService } from '../Services/baseservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-good-trends',
  templateUrl: './good-trends.component.html',
  styleUrls: ['./good-trends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GoodTrendsComponent implements OnInit {
  // charts created following this guide 
  // https://medium.com/codingthesmartway-com-blog/angular-chart-js-with-ng2-charts-e21c8262777f
  // https://stackoverflow.com/questions/39832874/how-do-i-change-the-color-for-ng2-charts
  // date found from stackoverflow
  // https://stackoverflow.com/questions/55311355/how-to-pass-only-date-from-angular-6-to-web-api
  // https://angular.io/api/common/DatePipe
  
  manager_privilege = 0;

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
  public barChartLabels: Label[] = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  
  public barChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Inventory Item' }
  ];

  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(51,153,50,0.7)',
      borderColor: 'rgba(51,153,50,0.7)',
      pointBackgroundColor: 'rgba(51,153,50,0.7)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.7)'
    },
    { // second color
      backgroundColor: 'rgba(51,153,50,0.7)',
      borderColor: 'rgba(51,153,50,0.7)',
      pointBackgroundColor: 'rgba(51,153,50,0.7)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,153,50,0.7)'
    }];

  public item: string = "inventory item";

  response_data;

  // Gets current date
  date = new Date;
  beginDate : any;
  endDate : any;
  
  constructor(private service: BaseserviceService, private datePipe: DatePipe) { }
  
  ngOnInit() {
    // Get begin and end dates, then format as strings
    // Current date is considered the end date, 7 days previous is the begin date
    this.date.getDate();
    this.endDate =  this.datePipe.transform(this.date, "yyyyMMdd");
    this.beginDate = this.date.setDate(this.date.getDate() - 7);
    this.beginDate = this.datePipe.transform(this.beginDate, "yyyyMMdd");
    this.endDate = this.endDate.toString();
    this.beginDate = this.beginDate.toString();
    console.log(this.beginDate)
    console.log(this.endDate);

    let privilege = localStorage.getItem("user_privilege");
    if(privilege == '0'){
      console.log("got here");
      //MANAGER PRIV
      this.manager_privilege = 1
      
      this.service.GetGoodTrends(localStorage.getItem("user_id"), this.beginDate, this.endDate).subscribe(
        response => {
          this.response_data = response;
          console.log(response);
        },
        error => {console.log(error)}
      )
    }
  }

  // Logic: pass back restaurant ID to get the data for the inventory items that were used
  // Object should be "{"inventory_item" : "name of item", "amount_used": # }
  // getGoodTrendsData {
  //   // Need to pass restaurant ID to get data.
  //   this.service.GetGoodTrendsData(localStorage.getItem("user_id"), date).subscribe(
  //     response => {
  //       this.response_data = response
  //     },
  //     error => {alert("It fucking broke")}
  //   )
  // }

  
 
}

