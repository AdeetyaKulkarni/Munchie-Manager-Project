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
  constructor(private service: BaseserviceService, private _Activatedroute:ActivatedRoute) { }

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

}
