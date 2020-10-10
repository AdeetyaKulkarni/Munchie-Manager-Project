package com.project.MunchieManagerBE.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.MunchieManagerBE.Beans.Customer_Bean;
import com.project.MunchieManagerBE.Beans.Employee_Bean;
import com.project.MunchieManagerBE.DBRepos.CustomerRegistrationRepo;
import com.project.MunchieManagerBE.DBRepos.RegistrationRepo;
import com.project.MunchieManagerBE.DBRepos.TestRepo;

// Required in every controller file | If not included will result in CORS error in Angular.
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")

@RestController  
public class ApplicationController {

	
	
	
	// ------------------BASIC METHODS---------------------------- //
	
	@GetMapping(path="/test")
	public String getTest() 
	{
		return "API's are working! CHANGED";
	} 

	
	// To use repository method you have to Autowire it in the controller
	@Autowired
	private TestRepo repo;
	
	@GetMapping(path="/checkdb")
	public String getName()
	{	
		// Using the repo method here
		return repo.FindAllNames().get(0);
		
	}
	
	
	// ---------------------------------------------------------- //
	
	@Autowired
	private RegistrationRepo regRepo;
	
	@Autowired
	private CustomerRegistrationRepo custRegRepo;
	
	
	// -----------------Registering Methods---------------------- //
	
	@PostMapping(path="/employeeregister")
	public boolean EmployeeRegister(@RequestBody Employee_Bean employeeBean) {
		
		regRepo.save(employeeBean);
		
		return true;
	}
	
	@PostMapping(path="/customerregister")
	public boolean CustomerRegister(@RequestBody Customer_Bean customerBean) {
		
		custRegRepo.save(customerBean);
		
		return true;
	}
	
	@PostMapping(path="/login")
	public boolean Login(@RequestBody String info) {
		
		String info1[] = info.split(",");
		List<String> result = regRepo.EmpLogin(info1[0], info1[1]);
		if  (result.size() == 0) {
			result = regRepo.CustLogin(info1[0], info1[1]);
		}
		//return result;
		return !(result.size() == 0);
		
	}
}
