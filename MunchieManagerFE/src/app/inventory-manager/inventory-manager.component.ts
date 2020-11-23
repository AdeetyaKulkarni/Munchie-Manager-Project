import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-inventory-manager',
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryManagerComponent implements OnInit {

  rest_goods = [1,2,3,4]

  constructor() { }

  ngOnInit() {
  }

}
