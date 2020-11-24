package com.project.MunchieManagerBE.DBRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.MunchieManagerBE.Beans.Inventory_Bean;

public interface InventoryRepo extends JpaRepository<Inventory_Bean, Long> {
	
	@Query(value="SELECT * FROM inventory WHERE rest_id = ?1", nativeQuery = true)
	List<Inventory_Bean> getRestInventory(long restID);
	
	@Query(value="SELECT * FROM inventory WHERE rest_id = ?1 AND name = ?2", nativeQuery = true)
	Inventory_Bean getSpecificItem(long restID, String invName);
	
	@Query(value="SELECT * FROM inventory WHERE rest_id = ?2 AND id = ?1", nativeQuery = true)
	Inventory_Bean FindObject(long id, long l);
	
}