package com.project.MunchieManagerBE.DBRepos;

import java.util.List;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.MunchieManagerBE.Beans.Customer_Bean;
import com.project.MunchieManagerBE.Beans.Employee_Bean;
import com.project.MunchieManagerBE.Beans.Trends_Bean;
import com.project.MunchieManagerBE.Beans.Name;

public interface TrendsRepo extends JpaRepository<Trends_Bean, Long> {
	
	@Query(value = "SELECT itemname FROM customer WHERE rest_id=?1 and date>=?2 and date<=?3 and itemtype=?4 ORDER BY id", nativeQuery = true)
	List<String> RetrieveItemNameByDate(long rest_id, String startdate, String enddate, int itemtype);
	
	//@Query(value = "SELECT quantity FROM customer WHERE rest_id=?1 and date>=?2 and itemtype=?3 ORDER BY id", nativeQuery = true)
	//long[] RetrieveItemQuantityByDate(long rest_id, Date date, int itemtype);
	
}
