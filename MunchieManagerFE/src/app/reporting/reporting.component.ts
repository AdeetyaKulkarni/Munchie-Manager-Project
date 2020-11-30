import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  from_date: Date = new Date();
  to_date: Date = new Date();
  cur_rest_id;
  trends_bean = new Trends_Bean(0,0,"",0,"")

  constructor(private service: BaseserviceService) { }

  ngOnInit() {
    this.cur_rest_id = localStorage.getItem("user_id");
  }

  Reporting(){
    this.trends_bean["rest_id"] = this.cur_rest_id;
    this.trends_bean["date"] = this.from_date;
    this.trends_bean["date"] = this.to_date;

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
  }

}
