import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseserviceService } from '../Services/baseservice.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  id = ""
  menu_items = []

  sum_cost = 0
  order =  new Array();

  constructor(private service: BaseserviceService, private _Activatedroute:ActivatedRoute) { }

  viewcartmode = 0

  ngOnInit() {

    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    
    this.service.GetAvailableMenuItems(this.id).subscribe(
      response => {
        console.log(response)
        this.menu_items = response
      },
      error => {
        alert("BAD API")
      }
    )
    
  }

  AddToOrder(menu_item){
     this.order.push(menu_item)
     this.sum_cost += menu_item["price"];
  }

  Remove_item(id, price){
      console.log(id)
      this.sum_cost -= price
      let new_arr = []
      for (let i=0; i<this.order.length; i++){
        if(i != id){
          new_arr.push(this.order[i])
        }
      }
      this.order = new_arr
      console.log(this.order)
  }

  PlaceOrder(){
   // for each item in orders call orderapi
   this.order.forEach(element => {
      this.service.Order(element).subscribe(
        response => {},
        error => {alert("BAD Api")}
      )
   });
   alert("Order successfully placed")
   this.order = []
   this.sum_cost = 0
   this.end_viewcartmode()
   this.ngOnInit()
  }

  start_viewcartmode(){
    this.viewcartmode = 1
  }
  end_viewcartmode(){
    this.viewcartmode = 0
  }


}
