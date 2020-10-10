package com.project.MunchieManagerBE.DBRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.MunchieManagerBE.Beans.Customer_Bean;
import com.project.MunchieManagerBE.Beans.Employee_Bean;
import com.project.MunchieManagerBE.Beans.Name;

public interface CustomerRegistrationRepo extends JpaRepository<Customer_Bean, Long> {
	
	
	
}
