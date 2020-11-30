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
  //from_date = new FormControl(new Date());;
  //to_date = new FormControl(new Date());;
  // from_date;
  // to_date;
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
    // this.fromdate = this.datePipe.transform(this.from_date.value, "yyyyMMdd");
    // this.fromdate = Number(this.fromdate);
    // this.todate = this.datePipe.transform(this.to_date.value, "yyyyMMdd");
    // this.todate = Number(this.todate)
    
  }





  Reporting(){
    this.trends_bean["rest_id"] = this.cur_rest_id;
    this.trends_bean["date"] = this.fromdate;
    this.trends_bean["date"] = this.todate;

    this.service.AddMenuItem(this.trends_bean).subscribe(
      response => { this.reportstring = "bitches";
                    console.log(response)          
                    this.ngOnInit()
                  },
      error => {alert("BAD API")}
    )
  }

  Submit()
  { 
    console.log(this.from_date)
    console.log(this.to_date)
    this.service.Reporting(this.cur_rest_id,this.from_date,this.to_date ).subscribe(
      response => { this.reportstring = response;
      console.log(response)          
      //this.ngOnInit()
    },
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
