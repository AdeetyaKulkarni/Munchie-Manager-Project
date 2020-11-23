import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Inventory_Bean } from '../main-page/main-page.component';
import { BaseserviceService } from '../Services/baseservice.service';

@Component({
  selector: 'app-inventory-manager',
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryManagerComponent implements OnInit {

  addmode = 0
  removemode = 0

  // Small increments or decrements
  increment = 0
  decrement = 0

  cur_rest_id;
  rest_goods = []
  inventory_bean = new Inventory_Bean(0,0,"",0);

  constructor(private service: BaseserviceService) { }

  ngOnInit() {
    
    this.cur_rest_id = localStorage.getItem("user_id");
    this.service.GetRestInventory(this.cur_rest_id).subscribe(
      response => {
         this.rest_goods = response;
      },
      error => {alert("BAD API")}
    )
  }

  Increment(good){
      good["amount"] = 1
      this.service.AddInventory(good).subscribe(
        response => {
          this.ngOnInit();
        },
        error => {alert("Bad API")}
      )

  }

  Decrement(good){
    good["amount"] = 1
    this.service.DeleteInventory(good).subscribe(
      response => {
        this.ngOnInit();
      },
      error => {alert("Bad API")}
    )
  }

  IncrementBulk(){
    this.inventory_bean["rest_id"] = this.cur_rest_id
    this.service.AddInventory(this.inventory_bean).subscribe(
      response => {console.log(response)
        this.ngOnInit()},
      error => {alert("BAD Api")}
    )
    this.inventory_bean = {}
    this.end_addmode()
  }

  DecrementBulk(){
    this.inventory_bean["rest_id"] = this.cur_rest_id
    this.service.DeleteInventory(this.inventory_bean).subscribe(
      response => {console.log(response)
        this.ngOnInit()},
      error => {alert("BAD Api")}
    )
    this.inventory_bean = {}
    this.end_removemode()
  }


  AddBulk(){
    this.start_addmode()
  }

  RemoveBulk(){
    this.start_removemode()
  }

  start_addmode(){
    this.removemode = 0
    this.addmode = 1
  }
  end_addmode(){
    this.addmode = 0
  }

  start_removemode(){
    this.addmode = 0
    this.removemode = 1
  }
  end_removemode(){
    this.removemode = 0
  }
}
