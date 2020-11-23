package com.project.MunchieManagerBE.DBRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.MunchieManagerBE.Beans.Employee_Bean;

public interface EmployeeRepo extends JpaRepository<Employee_Bean, Long> {
	
	@Query(value="SELECT * FROM employee WHERE restaurantname = ?1 AND privilege=1", nativeQuery = true)
	List<Employee_Bean>getRestaurantEmployees(String restaurantID);
	
	@Query(value="SELECT * FROM employee WHERE id = ?1", nativeQuery = true)
	Employee_Bean getEmployeeByID(long ID);
	
	@Query(value="SELECT * FROM employee WHERE privilege=0", nativeQuery = true)
	List<Employee_Bean> getAllRestaurants();

}