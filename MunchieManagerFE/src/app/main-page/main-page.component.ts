import { Component, OnInit } from '@angular/core';
import { BaseserviceService } from '../Services/baseservice.service';

//This is the bean for employee class
export class Employee_Bean{constructor(
    id:number,
    firstname:string,
    lastname:string,
    email:string,
    username:string,
    password:string,
    restaurant_name:string,
    restaurant_address:string,
    privilege:number
){}}

//This is the bean for customer class
export class Customer_Bean{constructor(
  id:number,
  firstname:string,
  lastname:string,
  email:string,
  username:string,
  password:string,
  privilege:number
){}}

export class Inventory_Bean{constructor(
  id:number,
  rest_id:number,
  name:string,
  amount:number
){}}



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  // This is my random variable - right now its empty but i will fill it with
  // data recieved from my service
  mystring = ""


  constructor(private service: BaseserviceService) { }

  ngOnInit() {

    //The functions inside ngOnInit execute right after the page loads
    console.log("Hello")
    this.callTestService()
    
  }


  callTestService(){

      // Step 4: Put in the constructor params - "private service: <service-file-name>"
      // Here i am going to call the test-service we created
      // Once you call the service method you have to subscribe to it
      // In the subscription you add what happens when response/error is received

      this.service.TestService().subscribe(

        response => {
          // Here i fill my variable with the data received  
          this.mystring = response
          // After filling it I print it out in the main-page.html
        },
        error => {
          this.mystring = "ERROR!"
        }

      )

  }

}
