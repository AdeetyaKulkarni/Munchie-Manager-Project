import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Customer_Bean, Employee_Bean, MainPageComponent } from '../main-page/main-page.component';
import { BaseserviceService } from '../Services/baseservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  //Live attributes
  login_error = ""
  choice = false
  employee = false  

  // Predefined instances
  employee_bean = new Employee_Bean(0,"","","","","","","",0)
  customer_bean = new Customer_Bean(0,"","","","","",2)


  constructor(private service: BaseserviceService, private router: Router) { }

  ngOnInit() {
  }

  SetPrivilage(num)
  {
    console.log(num)
    this.choice = true
    if(num==0){this.employee = true}
    
  }

  Register(privilage)
  {
      if(privilage == 0)
      {
        this.employee_bean["privilege"] = 0;
        this.employee_bean["username"] = this.employee_bean["firstname"]+this.employee_bean["lastname"]
        console.log(this.employee_bean)
        this.service.RegisterEmployee(this.employee_bean).subscribe(
            response => {
                console.log(response)
                this.router.navigate(["login"])
            },
            error => {alert("Error 500 - Backend connection expired")}
        )
      }
      else
      { this.customer_bean["privilege"] = 2;
        this.customer_bean["username"] = this.customer_bean["firstname"]+this.customer_bean["lastname"]
        console.log(this.customer_bean)
        this.service.RegisterCustomer(this.customer_bean).subscribe(
          response => {
              // This should be changed to route to customer menu
              console.log(response)
              this.router.navigate(["login"])
          },
          error => {alert("Error 500 - Backend connection expired")}
        )
      }

  }


}
