import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseserviceService {

  constructor(private http: HttpClient) { }

  //Sample service example - 
  /* Step 1: add this in the contructor parameters "private http: HttpClient"
     Step 2: Create the service method as the one below
     Step 3: Go to main-page.ts and see how the sample service is called and used
  */

    //Sample service that calls the backend api "/test"
    TestService(){
      let url = "http://localhost:8080/checkdb"
      return this.http.get(url, {responseType: 'text'});
      
      // This is an example for return type 'string' from java
      // If you want to return a json object you have to create the object here too to map it
      /*
        export class Myobj{
              constructor(public name:string, public age:int){}
        }
      */
      // Then you call return this.http.get<Myobj>(url);

    }


    //---------------------REGISTRATION SERVICES ONLY-------------------------------------------


    LoginService(loginstr){

      let url = "http://localhost:8080/login"
      return this.http.post<boolean>(url, loginstr)

    }


    RegisterEmployee(employee_bean)
    {
      let url = "http://localhost:8080/employeeregister"
      return this.http.post<boolean>(url, employee_bean);

    }

    RegisterCustomer(customer_bean)
    {
      let url = "http://localhost:8080/customerregister"
      return this.http.post<boolean>(url, customer_bean);

    }

    //--------------------------------------------------------------------------------------------

}
