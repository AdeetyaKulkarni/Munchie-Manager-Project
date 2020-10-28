import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportingComponent implements OnInit {

  from_date: Date = new Date();
  to_date: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

  Submit()
  { 
    console.log(this.from_date)
    console.log(this.to_date)
  }



}
