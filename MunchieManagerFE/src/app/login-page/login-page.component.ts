import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseserviceService } from '../Services/baseservice.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  //Live attributes
  login_error = ""
  email = ""
  password = ""

  constructor(private service: BaseserviceService,private router: Router) { }

  ngOnInit() {
  }

  Login()
  { 
    let loginstr = this.email+","+this.password
    console.log(loginstr)
    this.service.LoginService(loginstr).subscribe(
      response => {
          // Change navigation according to the privilage
          if(response){
            console.log(response);
            let privilege = response["privilege"];
            localStorage.setItem('user_privilege', privilege);
            localStorage.setItem('login-status', '1');
            localStorage.setItem('username', response["firstname"]);
            localStorage.setItem('user_id', response["id"]);
            if(privilege == 0){
              this.router.navigate(["dashboard/manager-dashboard"]);
            }
            else if(privilege == 1){
              //EMPLOYEE
              localStorage.setItem("user_id", response["rest_name"]);
              this.router.navigate(["dashboard/manager-dashboard"]);
            }
            else{
              //CUSTOMER
              this.router.navigate(["customer-dashboard"]);
            }
          }
          else{this.login_error="User does not exist - please register first"}
      },
      error => {alert("Error 500 - connection timed out")}
    )
  }

}
