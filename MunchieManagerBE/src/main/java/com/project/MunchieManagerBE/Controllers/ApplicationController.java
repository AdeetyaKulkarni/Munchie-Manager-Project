package com.project.MunchieManagerBE.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.MunchieManagerBE.Beans.Customer_Bean;
import com.project.MunchieManagerBE.Beans.Employee_Bean;
import com.project.MunchieManagerBE.Beans.Inventory_Bean;
import com.project.MunchieManagerBE.Beans.Menu_Bean;
import com.project.MunchieManagerBE.DBRepos.CustomerRegistrationRepo;
import com.project.MunchieManagerBE.DBRepos.EmployeeRepo;
import com.project.MunchieManagerBE.DBRepos.InventoryRepo;
import com.project.MunchieManagerBE.DBRepos.MenuRepo;
import com.project.MunchieManagerBE.DBRepos.RegistrationRepo;
import com.project.MunchieManagerBE.DBRepos.TestRepo;

// Required in every controller file | If not included will result in CORS error in Angular.
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")

@RestController  
public class ApplicationController {

	@Autowired
	private RegistrationRepo regRepo;
	
	@Autowired
	private CustomerRegistrationRepo custRegRepo;
	
	@Autowired
	private MenuRepo menuRepo;
	
	@Autowired
	private EmployeeRepo empRepo;
	
	@Autowired
	private InventoryRepo invRepo;
	
	
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
	
	@GetMapping(path="/getAllMenu")
	public List<Menu_Bean> getAllMenu() {
		return menuRepo.fullMenu();
	}
	
	@GetMapping(path="/getMenu")
	public List<Menu_Bean> getRestMenu(@RequestParam int restID){
		return menuRepo.restMenu(restID);
	}
	
	@GetMapping(path="/retrieve_all_employees")
	public List<Employee_Bean> getAllRestEmployees(@RequestParam int restID){
		return empRepo.getRestaurantEmployees(restID);
	}
	
	@GetMapping(path="/delete_employee") //true if deleted, false if employee doesn't exist
	public boolean deleteEmployee(@RequestParam long empID) {
		Employee_Bean emp = empRepo.getEmployeeByID(empID);
		if(emp != null){
			empRepo.deleteById(empID);
			return true;
		}
		return false;
	}
	
	@GetMapping(path="/getRestInv")
	public List<Inventory_Bean> getRestInv(@RequestParam long restID){
		return invRepo.getRestInventory(restID);
	}
	
	@GetMapping(path="/getAvail")
	public List<Menu_Bean> getAvailableMenuItems(@RequestParam long restID){
		List<Menu_Bean> items = menuRepo.restMenu(restID);
		List<Inventory_Bean> food = invRepo.getRestInventory(restID);
		List<Integer> toBeRemoved = new ArrayList<Integer>();
		//boolean found = false;
		//int needed = -1;
		
		List<Menu_Bean> available = items; //copy list so we can modifiy it while iterating
		
		for(Menu_Bean m : items) {
			long ingredientList[] = m.getIngredients();
			for(int i = 0; i < ingredientList.length; i++) { //for each inventory item required...
				boolean found = false; //reset found condition
				int had = -1;
				for(Inventory_Bean in : food) { //for each item in the rest's inventory...
					long id = in.getId();
					if(ingredientList[i] == id) {
						found = true;
						had = in.getAmount();
						break;
					}
				}
				
				if(!found) { //if needed inventory item is not found...
//					System.out.println("not found");
//					System.out.println(m.getName());
					toBeRemoved.add(available.indexOf(m)); //remove the menu item from the list of available items
					break; //break out of the loop checking items
				} 
				else if(m.getQuantity()[i] > had) { //in inventory item found but not enough stock... //need >= had
//					System.out.println("not enough quantity");
//					System.out.println(m.getName());
//					System.out.println("had:" + had);
//					System.out.println(m.getQuantity()[i]);
					toBeRemoved.add(available.indexOf(m)); //remove the menu item from the list of available items
					break; //break out of the loop checking items
					
				//if neither of above conditions are true throughout all inventory items, we have enough stock to make the dish, and the menu item should be sent to the front end.
				}
			}
		}
		
		Object[] toRemove = toBeRemoved.toArray();
		for(int j = 0; j < toRemove.length; j++) {
			available.remove((int)toRemove[j]);
		}
		
		return available;
	}
	
	
	// ---------------------------------------------------------- //
	
	
	
	
	// -----------------Registering Methods---------------------- //
	
	@PostMapping(path="/employeeregister")
	public Employee_Bean EmployeeRegister(@RequestBody Employee_Bean employeeBean) {
		
		regRepo.save(employeeBean);
		
		return employeeBean;
	}
	
	@PostMapping(path="/customerregister")
	public boolean CustomerRegister(@RequestBody Customer_Bean customerBean) {
		
		custRegRepo.save(customerBean);
		
		return true;
	}
	
	@PostMapping(path="/login")
	public Employee_Bean Login(@RequestBody String info) {
		
		String info1[] = info.split(",");
		Employee_Bean result = regRepo.EmpLogin(info1[0], info1[1]);
//		if  (result.size() == 0) {
//			result = regRepo.CustLogin(info1[0], info1[1]);
//		}
//		//return result;
//		return !(result.size() == 0);
		return result;
	}
	
	@PostMapping(path="/newMenuItem")
	public boolean newMenuItem(@RequestBody Menu_Bean menu) {
		menuRepo.save(menu);
		
		return true; //why do we need this?
	}
	
	@PostMapping(path="/add_employee")
	public boolean addEmployee(@RequestBody Employee_Bean emp) {
		empRepo.save(emp);
		
		return true;
	}
	
	@PostMapping(path="/update_employee")
	public boolean updateEmployee(@RequestBody Employee_Bean emp) {
		empRepo.delete(emp);
		empRepo.save(emp);
		
		return true;
	}
	
	@PostMapping(path="/addInvItem")
	public void addInv(@RequestBody Inventory_Bean inv) {
		//get existing item entry for item, if any
		Inventory_Bean oldItem = invRepo.getSpecificItem(inv.getRest_id(), inv.getName());
		
		if(oldItem != null) {
			inv.setAmount(inv.getAmount() + oldItem.getAmount());
		}
		
		invRepo.save(inv);
	}
	
	@PostMapping(path="/removeInvItem")
	public boolean remInv(@RequestBody Inventory_Bean inv) { //returns true if there are any items left
		//get existing item entry for item, if any
		Inventory_Bean oldItem = invRepo.getSpecificItem(inv.getRest_id(), inv.getName());
		
		if(oldItem != null) {
			int n1 = oldItem.getAmount() - inv.getAmount();
			if(n1 < 1) { //if items depleted, delete it from the db and quit this method
				invRepo.delete(oldItem);
				return false;
			}
			
			inv.setAmount(oldItem.getAmount() - inv.getAmount());
			invRepo.save(inv);
			return true;
		}
		
		return false;
	}
}
