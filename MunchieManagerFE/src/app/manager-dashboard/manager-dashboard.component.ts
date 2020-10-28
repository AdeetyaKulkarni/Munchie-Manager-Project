import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee_Bean } from '../main-page/main-page.component';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerDashboardComponent implements OnInit {

  //NGIF vars
  edit_mode = 0
  register_mode = 0
  registration_error = 0
  editing_error = 0

  //Data vars
  BSI = "Avocado toast"
  INVMAX = "Corn"
  employee_bean = new Employee_Bean(0,"","","","","","","",0)



  employee_array = [
    {"firstname":"Adeetya", "email":"hello@gmail.com", "password":"wowz"},
    {"firstname":"Abbey", "email":"hello1@gmail.com", "password":"bow"},
    {"firstname":"Harsh", "email":"hello2@gmail.com", "password":"pasw"}
  ]

  constructor() { }

  ngOnInit() {
    // Retrieve employee's of this restaurant-id and store in employee_array

  }

  Register_employee()
  {
    console.log("New employee!")
    console.log(this.employee_bean)
    // Add employee api - send employee bean
    
  }

  Delete_employee(employee_id, array_index){
    console.log(employee_id)
    console.log(array_index)
    // Delete employee api
  }

  Edit_employee(employee_id, array_index){
    console.log(employee_id)
    console.log(array_index)
    // When the employee to edit is selected fill his info in employee_bean
    this.employee_bean["id"] = this.employee_array[array_index]["id"]
    this.employee_bean["firstname"] = this.employee_array[array_index]["firstname"]
    console.log(this.employee_bean["id"])
    console.log(this.employee_bean["firstname"])
    this.Enable_edit_mode()
     
  }

  Update_employee() {
    // Update employee API call

  }


  //NGIF SETTERS
  Enable_edit_mode(){
    this.register_mode = 0
    this.edit_mode = 1
  }
  Disable_edit_mode(){
    this.edit_mode = 0
  }

  Enable_register_mode(){
    this.employee_bean = {}
    this.edit_mode = 0
    this.register_mode = 1
  }
  Disable_register_mode(){
    this.register_mode = 0
  }


}
