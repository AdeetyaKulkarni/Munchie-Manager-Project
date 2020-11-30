import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee_Bean } from '../main-page/main-page.component';
import { BaseserviceService } from '../Services/baseservice.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerDashboardComponent implements OnInit {

  //NGIF vars
  mpi = ""
  mui = ""
  username = localStorage.getItem("username");
  manager_privilege = 0
  edit_mode = 0
  register_mode = 0
  registration_error = 0
  editing_error = 0

  //Data vars
  BSI = "Avocado toast"
  INVMAX = "Corn"
  employee_bean = new Employee_Bean(0,"","","","","","","",0)
  employee_array = []

  constructor(private service: BaseserviceService) { }

  ngOnInit() {
    let privilege = localStorage.getItem("user_privilege");
    if(privilege == '0'){
      //MANAGER PRIV
      this.manager_privilege = 1
      // Retrieve employee's of this restaurant-id and store in employee_array
      this.service.GetEmployeesAtRestaurant(localStorage.getItem("user_id")).subscribe(
        response => {
          this.employee_array = response;
        },
        error => {alert("BAD API")}
      )
    }

    this.service.MostPopularItem(localStorage.getItem("user_id")).subscribe(
      response => {
        this.mpi = response["key"];
      },
      error => {alert("BAD API")}
    )

    this.service.MostUsedIngr(localStorage.getItem("user_id")).subscribe(
      response => {
        this.mui = response["key"];
      },
      error => {alert("BAD API")}
    )


  }
   

  Register_employee()
  {
    console.log("New employee!")
    this.employee_bean["privilege"] = 1
    this.employee_bean["restaurant_name"] = localStorage.getItem("user_id")

    console.log(this.employee_bean)
    // Add employee api - send employee bean
    this.service.RegisterEmployee(this.employee_bean).subscribe(
      response => {
        console.log(response);
        this.Disable_register_mode();
        this.employee_bean = {};
      },
      error => {alert("BAD API")}
    )
    
  }

  Delete_employee(employee_id, array_index){
    console.log(employee_id)
    console.log(array_index)
    this.service.DeleteEmployee(employee_id).subscribe(
      response => {
        console.log("User deleted successfully")
        location.reload();
      },
      error => {alert("BAD API")}
    )
    // Delete employee api
  }

  Edit_employee(employee_id, array_index){
    console.log(employee_id)
    console.log(array_index)
    // When the employee to edit is selected fill his info in employee_bean
    this.employee_bean["id"] = this.employee_array[array_index]["id"]
    this.employee_bean["firstname"] = this.employee_array[array_index]["firstname"]
    this.employee_bean["lastname"] = this.employee_array[array_index]["lastname"]
    this.employee_bean["email"] = this.employee_array[array_index]["email"]

    console.log(this.employee_bean["id"])
    console.log(this.employee_bean["firstname"])
    this.Enable_edit_mode()
     
  }

  Update_employee() {
    // Update employee API call

    this.service.UpdateEmployee(this.employee_bean).subscribe(

      response => {
        console.log(response);
        this.Disable_edit_mode();
        this.employee_bean = {};
      },
      error => {alert("BAD API")}

    )

  }


  //NGIF SETTERS
  Enable_edit_mode(){
    this.register_mode = 0
    this.edit_mode = 1
  }
  Disable_edit_mode(){
    this.edit_mode = 0
    location.reload();
  }

  Enable_register_mode(){
    this.employee_bean = {}
    this.edit_mode = 0
    this.register_mode = 1
  }
  Disable_register_mode(){
    this.register_mode = 0
    location.reload();
  }


}
