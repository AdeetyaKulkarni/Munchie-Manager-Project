package com.project.MunchieManagerBE.Controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Date;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import java.io.IOException;
import java.util.HashMap;
import java.util.Calendar;
 
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.MunchieManagerBE.Beans.Customer_Bean;
import com.project.MunchieManagerBE.Beans.Employee_Bean;
import com.project.MunchieManagerBE.Beans.Inventory_Bean;
import com.project.MunchieManagerBE.Beans.Menu_Bean;
import com.project.MunchieManagerBE.Beans.Trends_Bean;
import com.project.MunchieManagerBE.DBRepos.CustomerRepo;
import com.project.MunchieManagerBE.DBRepos.EmployeeRepo;
import com.project.MunchieManagerBE.DBRepos.InventoryRepo;
import com.project.MunchieManagerBE.DBRepos.MenuRepo;
import com.project.MunchieManagerBE.DBRepos.RegistrationRepo;
import com.project.MunchieManagerBE.DBRepos.TestRepo;
import com.project.MunchieManagerBE.DBRepos.TrendsRepo;

import net.minidev.json.JSONObject;

// Required in every controller file | If not included will result in CORS error in Angular.
@CrossOrigin(origins="http://localhost:4200", allowCredentials="true")

@RestController  
public class ApplicationController {

	@Autowired
	private RegistrationRepo regRepo;
	
	@Autowired
	private CustomerRepo custRepo;
	
	@Autowired
	private MenuRepo menuRepo;
	
	@Autowired
	private EmployeeRepo empRepo;
	
	@Autowired
	private InventoryRepo invRepo;
	
	@Autowired
	private TestRepo repo;
	
	@Autowired
	private TrendsRepo trendsRepo;
	
	// -----------------TEST METHODS------------------------------ //
	
	@GetMapping(path="/test")
	public String getTest() 
	{
		return "API's are working! CHANGED";
	} 
	
	@GetMapping(path="/checkdb")
	public String getName()
	{	
		// Using the repo method here
		return repo.FindAllNames().get(0);
		
	}

	
	// -----------------LOGIN API---------------------------------//
	
	@PostMapping(path="/login")
	public JSONObject Login(@RequestBody String info) {
		
		JSONObject obj = new JSONObject();
		
		String info1[] = info.split(",");
		
		Employee_Bean result = regRepo.EmpLogin(info1[0], info1[1]);
		
		if(result == null) {
			Customer_Bean result1 = custRepo.CustLogin(info1[0], info1[1]); 
			if(result1 == null) {
				return null;
			}
			else {
				obj.put("id", result1.getId());
				obj.put("firstname", result1.getFirstname());
				obj.put("privilege", result1.getprivilege());
				return obj;
			}
		}
		else {
				obj.put("id", result.getId());
				obj.put("firstname", result.getFirstname());
				obj.put("privilege", result.getprivilege());
				obj.put("rest_name", result.getRestaurant_name());
				return obj;
		}
		
		
	}
	
	
	// --------------------Employee API's--------------------------- //
	
	@PostMapping(path="/employeeregister")
	public Employee_Bean EmployeeRegister(@RequestBody Employee_Bean employeeBean) {
		
		regRepo.save(employeeBean);
		
		return employeeBean;
	}
	
	@PostMapping(path="/update_employee")
	public boolean updateEmployee(@RequestBody Employee_Bean emp) {
		empRepo.delete(emp);
		empRepo.save(emp);
		
		return true;
	}
	
	@DeleteMapping(path="/delete_employee") //true if deleted, false if employee doesn't exist
	public boolean deleteEmployee(@RequestParam long empID) {
		Employee_Bean emp = empRepo.getEmployeeByID(empID);
		if(emp != null){
			empRepo.deleteById(empID);
			return true;
		}
		return false;
	}
	
	@GetMapping(path="/retrieve_all_employees")
	public List<Employee_Bean> getAllRestEmployees(@RequestParam int restID){
		String ID = Integer.toString(restID);
		return empRepo.getRestaurantEmployees(ID);
	}
	
	@GetMapping(path="/GetAllRestaurants")
	public List<JSONObject> GetAllRestaurants() {
		List<Employee_Bean> arr;
		arr = empRepo.getAllRestaurants();
		ArrayList<JSONObject> jsonarr = new ArrayList<JSONObject>();
		
		for(int i=0; i< arr.size(); i++) {
			JSONObject obj = new JSONObject();
			obj.put("restaurant_name", arr.get(i).getRestaurant_name());
			obj.put("restaurant_id", arr.get(i).getId());
			jsonarr.add(obj);
		}	
		
		return jsonarr;
		
	}
	
	// --------------------Customer API's------------------------- //
	
	@PostMapping(path="/customerregister")
	public boolean CustomerRegister(@RequestBody Customer_Bean customerBean) {
		
		custRepo.save(customerBean);
		
		return true;
	}
	
	@PostMapping(path="/order") 
	public boolean order(@RequestBody Menu_Bean mb) {
		
		for(int i=0; i< mb.getIngredients().length; i++) {
			Inventory_Bean ib = new Inventory_Bean();
			ib = invRepo.FindObject(mb.getIngredients()[i], mb.getRest_id());
			ib.setAmount(ib.getAmount() - mb.getQuantity()[i]);
			if(ib.getAmount() < 0) {
				return false;
			}
			invRepo.save(ib);
		}
		
		return true;
		
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

	@GetMapping(path="/getMenuItems")
	public List<Menu_Bean> getMenuItemsbyRestID(@RequestParam long restID){
		return menuRepo.restMenu(restID);
	}
	
	@GetMapping(path="/getAvailMenu")
	public List<Menu_Bean> getAvailMenuItemsforRestID(@RequestParam long restID){
		
		List<Menu_Bean> allmenu = menuRepo.restMenu(restID);
	    ArrayList<Long> removal_index = new ArrayList<Long>();
	    
	    for(int i=0; i< ((allmenu.size())); i++) {
			 long[] ingrelist = allmenu.get(i).getIngredients();
			 int[] quantlist = allmenu.get(i).getQuantity();
			 for(int j=0; j<((ingrelist.length)); j++) {
				 if(this.isavailinv(ingrelist[j], quantlist[j]) == false) {
					 removal_index.add(allmenu.get(i).getId());
					 break;
				 }
			 }
		}
	    
	   
        Iterator<Menu_Bean> itr = allmenu.iterator();
        while(itr.hasNext()) {
        	Menu_Bean mb = itr.next();
        	for(int i=0; i<removal_index.size(); i++) {
        		if(mb.getId() == removal_index.get(i)) {
        			itr.remove();
        			break;
        		}
        	}
        	
        }
        

	    
	    return allmenu;
	}
	
	// --------------------Inventory API's-----------------------------//
	
	@PostMapping(path="/addInvItem")
	public void addInv(@RequestBody Inventory_Bean inv) {
		//get existing item entry for item, if any
		Inventory_Bean oldItem = invRepo.getSpecificItem(inv.getRest_id(), inv.getName());
		
		if(oldItem != null) {
			oldItem.setAmount(inv.getAmount() + oldItem.getAmount());
			invRepo.save(oldItem);
		}
		else {
			invRepo.save(inv);
		}
		
		
	}
	
	@PostMapping(path="/removeInvItem")
	public boolean remInv(@RequestBody Inventory_Bean inv) { //returns true if there are any items left

		//get existing item entry for item, if any
		Inventory_Bean oldItem = invRepo.getSpecificItem(inv.getRest_id(), inv.getName());
		
		if(oldItem != null) {
			int n1 = oldItem.getAmount() - inv.getAmount();
			if(n1 < 0) { //if items depleted, delete it from the db and quit this method
				invRepo.delete(oldItem);
				return false;
			}
			
			oldItem.setAmount(oldItem.getAmount() - inv.getAmount());
			invRepo.save(oldItem);
			return true;
		}
		
		return false;
	}
	
	@GetMapping(path="/getRestInv")
	public List<Inventory_Bean> getRestInv(@RequestParam long restID){
		return invRepo.getRestInventory(restID);
	}

	@GetMapping(path = "/cs")
	public boolean isavailinv(@RequestParam long inventory_id, @RequestParam long needed) {
		
		if(invRepo.existsById(inventory_id)) {
			if(invRepo.getAmount(inventory_id) < needed ) {
				return false;
			}
			else {
				return true;
			}
		}
		else {
				return false;
			}
	}
	
	// -------------------- Menu API's------------------------- //
	
	@PostMapping(path="/newMenuItem")
	public boolean newMenuItem(@RequestBody Menu_Bean menu) {
		menuRepo.save(menu);
		
		return true;
	}
	
	@GetMapping(path="/getAllMenu")
	public List<Menu_Bean> getAllMenu() {
		return menuRepo.fullMenu();
	}
	
	@GetMapping(path="/getMenu")
	public List<Menu_Bean> getRestMenu(@RequestParam int restID){

		return menuRepo.restMenu(restID);
	}

	// -------------------- Trends API's------------------------- //
	
	@PostMapping(path="/newTrendsItem")
	public boolean newTrendsItem(@RequestBody Trends_Bean trend) {
		trendsRepo.save(trend);
		
		return true;
	}
	
	@GetMapping(path="/getRestaurantTrends")
	public JSONObject foodPopularity(@RequestParam long rest_id, @RequestParam int date) {
		
		List<String> trendsName = trendsRepo.RetrieveItemNameByDate(rest_id, date, 1);
		JSONObject json = new JSONObject();
		
		if (trendsName.size() == 0) {
			return json;
		}
		
		//Hashtable<String, Integer> dict = new Hashtable<String, Integer>();
		
		for (int i = 0; i < trendsName.size(); i++) {
			if (!json.containsKey(trendsName.get(i))) {
				json.put(trendsName.get(i), 1);
			}
			else {
				int temp = (int) json.get(trendsName.get(i));
				json.put(trendsName.get(i), temp + 1);
			}
		}
		
		/*String[] listString = (String[]) dict.keySet().toArray(); 
		String Result = "{ ";
		
		for (int i = 0; i < dict.size(); i++) {
			Result += "\"" + listString[0] + "\":" + " \"" + dict.get(listString[0]) + "\", \n";  
		}
		
		Result += "}";*/
		
		return json;
	}
	
	@GetMapping(path="/getGoodsTrends")
	public JSONObject ingredientPopularity(@RequestParam long rest_id, @RequestParam int date) {
		
		List<String> trendsName = trendsRepo.RetrieveItemNameByDate(rest_id, date, 2);
		JSONObject json = new JSONObject();
		
		if (trendsName.size() == 0) {
			return json;
		}
		
		//Hashtable<String, Integer> dict = new Hashtable<String, Integer>();
		
		for (int i = 0; i < trendsName.size(); i++) {
			if (!json.containsKey(trendsName.get(i))) {
				json.put(trendsName.get(i), 1);
			}
			else {
				json.put(trendsName.get(i), (int) json.get(trendsName.get(i)) + 1);
			}
		}
		
		/*String[] listString = (String[]) dict.keySet().toArray(); 
		String Result = "{ ";
		
		for (int i = 0; i < dict.size(); i++) {
			Result += "\"" + listString[0] + "\":" + " \"" + dict.get(listString[0]) + "\", \n";  
		}
		
		Result += "}";*/
		
		return json;
	}

	// -------------------- Reporting API's------------------------- //
	
	@PostMapping(path="/generateReport")
	public JSONObject GenerateReport(long rest_id, int startdate, int enddate) {
		JSONObject foodPopString = new JSONObject();
		JSONObject ingPopString = new JSONObject();
		
		for ( int i = startdate; i < enddate + 1; i++) {
			foodPopString = foodPopularity(rest_id, i);
			ingPopString = ingredientPopularity(rest_id, i);
		}
		
		
        
		JSONObject jsonarr = new JSONObject();
		jsonarr.put("foodPopString", foodPopString);
		jsonarr.put("inPopString", ingPopString);
		
		return jsonarr;
	}
	
	// -------------------- Dashboard  API's------------------------- //
	
	/*public String MostPopularItem() {
		Date today = Calendar.getInstance().getTime();
		String todaysDate = new Date().getda
		return "";
	}*/
	
}

	


