import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Inventory_Bean, Menu_Bean } from '../main-page/main-page.component';
import { BaseserviceService } from '../Services/baseservice.service';


@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-creation.component.html',
  styleUrls: ['./menu-creation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuCreationComponent implements OnInit {

  selected:any;
  selectedingredients = [];

  itemingredients  = [ ];

  rest_menuitems = [];

  addmode = 0
  removemode = 0

  // Small increments or decrements
  increment = 0
  decrement = 0
  cur_rest_id;
  
  menu_bean = new Menu_Bean(0,0,"",[],[],0,true);


  constructor(private service: BaseserviceService) { }

  ngOnInit() {
  
    this.cur_rest_id = localStorage.getItem("user_id");
    this.service.GetRestInventory(this.cur_rest_id).subscribe(
      response => {
         this.itemingredients = response.sort();
         console.log(this.itemingredients);
      },
      error => {alert("BAD API")}
    )

    this.service.GetAvailableMenuItems(this.cur_rest_id).subscribe(
      response => {
        this.rest_menuitems = response
        console.log(response)
      ,
      error => {alert("BAD API")}
     }
    )
  }

  AddMenuItem(){
    this.menu_bean["ingredients"] = this.selectedingredients;
    console.log(this.selectedingredients)
    this.service.AddMenuItem(this.menu_bean).subscribe(
      response => {console.log(response)},
      error => {alert("BAD API")}
    )

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

  onChange(event) {
    console.log(event.checked)
    console.log(event.source.value)
  
    if(event.checked) {
      this.selectedingredients.push(event.source.value.id)
    } else {
      
      for(var index in this.selectedingredients){
        if(this.selectedingredients[index] == event.source.value){
          delete this.selectedingredients[index]
        }
      }

     
    }
    
  }



}