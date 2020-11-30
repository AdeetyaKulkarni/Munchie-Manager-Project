import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Trends_Bean } from '../main-page/main-page.component';
import { BaseserviceService } from '../Services/baseservice.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportingComponent implements OnInit {

  reportstring: string;
  cur_rest_id;
  fromdate: any;
  todate: any;


  trends_bean = new Trends_Bean(0,0,"",0,"")

   // Date variables
   from_date: any;
   fromDate = new FormControl(new Date());
   to_date: any;
   toDate = new FormControl(new Date());



  constructor(private service: BaseserviceService, private datePipe: DatePipe) { }

  ngOnInit() {
     this.cur_rest_id = localStorage.getItem("user_id");
  }

  Submit()
  { 
    console.log(this.from_date)
    console.log(this.to_date)
    this.service.Reporting(this.cur_rest_id,this.from_date,this.to_date ).subscribe(
      response => {this.reportstring = response["report"]},
      error => {alert("BAD API")}
    )

  }

  selectEvent(event: any) {
    this.from_date = this.datePipe.transform(this.fromDate.value, "yyyyMMdd");
    this.from_date = Number(this.from_date);
    console.log(this.from_date);
  }

  selectEvent2(event: any) {
    this.to_date = this.datePipe.transform(this.toDate.value, "yyyyMMdd");
    this.to_date = Number(this.to_date);
    console.log(this.to_date);
  }

}
