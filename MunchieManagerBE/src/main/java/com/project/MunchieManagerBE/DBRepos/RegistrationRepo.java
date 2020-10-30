package com.project.MunchieManagerBE.DBRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.MunchieManagerBE.Beans.Customer_Bean;
import com.project.MunchieManagerBE.Beans.Employee_Bean;
import com.project.MunchieManagerBE.Beans.Name;

public interface RegistrationRepo extends JpaRepository<Employee_Bean, Long> {
	
	@Query(value = "SELECT id FROM employee WHERE email=?1 and password=?2", nativeQuery = true)
	Employee_Bean EmpLogin(String email, String password);
	
	@Query(value = "SELECT * FROM customer WHERE email=?1 and password=?2", nativeQuery = true)
	Customer_Bean CustLogin(String email, String password);
	
}
