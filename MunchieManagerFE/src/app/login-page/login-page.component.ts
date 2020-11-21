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
          if(response == true){this.router.navigate([""])}
          else{this.login_error="User does not exist - please register first"}
      },
      error => {alert("Error 500 - connection timed out")}
    )
  }

}
