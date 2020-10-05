package com.project.MunchieManagerBE.DBRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.MunchieManagerBE.Beans.Name;



public interface TestRepo extends JpaRepository<Name, Long>{

	@Query(value = "SELECT * FROM NAME", nativeQuery = true)
	List<String> FindAllNames();	
	
	
}
