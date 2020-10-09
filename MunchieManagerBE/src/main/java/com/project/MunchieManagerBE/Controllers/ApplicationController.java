package com.project.MunchieManagerBE.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	
	
}
