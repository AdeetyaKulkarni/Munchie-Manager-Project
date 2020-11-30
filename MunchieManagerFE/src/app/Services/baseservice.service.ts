import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee_Bean, Inventory_Bean } from '../main-page/main-page.component';

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


    //---------------------REGISTRATION/LOGIN API Calls-------------------------------------------


    LoginService(loginstr){

      let url = "http://localhost:8080/login"
      return this.http.post<any>(url, loginstr)

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

    //------------------------------Employee API Calls--------------------------------------------------

    GetEmployeesAtRestaurant(id){

      //id is the id of the manager
      let url = "http://localhost:8080/retrieve_all_employees?restID=" + id 
      return this.http.get<any>(url)
    }

    UpdateEmployee(employee_bean){
      let url = "http://localhost:8080/update_employee"
      return this.http.post<any>(url, employee_bean);
    }

    DeleteEmployee(emp_id){
      let url = "http://localhost:8080/delete_employee?empID="+emp_id
      return this.http.delete<any>(url)

    }

    //------------------------------Inventory API Calls--------------------------------------------------

    AddInventory(good){
      let url = "http://localhost:8080/addInvItem"
      return this.http.post<any>(url, good);
    }

    DeleteInventory(good){
      let url = "http://localhost:8080/removeInvItem"
      return this.http.post<any>(url, good);
    }

    GetRestInventory(id){

      let url = "http://localhost:8080/getRestInv?restID="+id
      return this.http.get<Inventory_Bean[]>(url);

    }


    //------------------------------Restaurant API Calls--------------------------------------------------

    GetAllRestaurants(){
      let url = "http://localhost:8080/GetAllRestaurants"
      return this.http.get<any>(url);

    }

    //------------------------------Trends API Calls-------------------------------------------------------

    GetGoodTrends(id, date) {
      const params = new HttpParams()
        .set('rest_id', id)
        .set('date', date)

      let url = "http://localhost:8080/getGoodsTrends"
      return this.http.get<any>(url, {params});
    }

    GetRestaurantTrends(id, date) {
      const params = new HttpParams()
        .set('rest_id', id)
        .set('date', date)

      let url = "http://localhost:8080/getRestaurantTrends"
      return this.http.get<any>(url, {params});
    }
    


    //------------------------------Menu API Calls--------------------------------------------------

    GetMenuItems(id){
      let url = "http://localhost:8080/getMenuItems?restID="+id
      return this.http.get<any>(url)
    }

    GetAvailableMenuItems(id){
      let url = "http://localhost:8080/getAvailMenu?restID="+id
      return this.http.get<any>(url)
    }

    AddMenuItem(menuitem){
      let url = "http://localhost:8080/newMenuItem"
      return this.http.post<any>(url, menuitem)
    }


    //------------------------------Customer API Calls--------------------------------------------------

    Order(menu_item){
      let url = "http://localhost:8080/order"
      return this.http.post<any>(url, menu_item)
    }
    //------------------------------Reporting API Calls--------------------------------------------------

    Reporting(id,startdate,enddate){
    
     let url = "http://localhost:8080/generateReport?rest_id="+id+"&startdate="+startdate+"&enddate="+enddate
     return this.http.get<any>(url);

    }
}



