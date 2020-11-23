import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BaseserviceService } from '../Services/baseservice.service';

@Component({
  selector: 'app-customer-dasboard',
  templateUrl: './customer-dasboard.component.html',
  styleUrls: ['./customer-dasboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerDasboardComponent implements OnInit {

  public searchInput:String = '';
  public searchResult: Array<any> = [];
  public seriesList: Array<any> = [];

  constructor(private service: BaseserviceService, private router: Router) { }

  ngOnInit() {
    //Retrieve all addresses
    this.service.GetAllRestaurants().subscribe(
      response =>{
          this.seriesList = response
          console.log(response)
      },
      error => {alert("BAD API")}
    )

  }

  Navigate(rest){
    console.log(rest)
    let str = "restaurant-menu/"+rest.restaurant_id
    this.router.navigate([str])
  }



  fetchSeries(event: any) {
    if (event.target.value === '') {
      return this.searchResult = [];
    }
    this.searchResult = this.seriesList.filter((series) => {
      return series.restaurant_name.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
  }


}
