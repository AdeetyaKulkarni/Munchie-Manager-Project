package com.project.MunchieManagerBE.DBRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.MunchieManagerBE.Beans.Menu_Bean;

public interface MenuRepo extends JpaRepository<Menu_Bean, Long> {
	
	@Query(value = "SELECT * FROM Menu", nativeQuery = true)
	List<Menu_Bean> fullMenu();
	
	//get menu items for specific restaurant
	@Query(value = "SELECT * FROM Menu WHERE rest_ID=?1", nativeQuery = true)
	List<Menu_Bean> restMenu(long ID);
	
	//can use the save() method of this class to save a Menu_Bean instance to the table automatically
	
	
}