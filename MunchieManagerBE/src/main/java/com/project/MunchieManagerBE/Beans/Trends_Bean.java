package com.project.MunchieManagerBE.Beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "Trends")
public class Trends_Bean {

	long id;
	long rest_id;
	String itemname;
	int itemtype;
	String date;
	
	
	public Trends_Bean() {}
	
	public Trends_Bean(long id, long rest_id, String itemname, int itemtype, String date) {
		super();
		this.id = id;
		this.rest_id = rest_id;
		this.itemname = itemname;
		this.itemtype = itemtype;
		this.date = date;
	}




	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}


	@Column(name = "rest_id")
	public long getRest_id() {
		return rest_id;
	}
	
	@Column(name = "itemname")
	public String getItemname() {
		return itemname;
	}

	@Column(name = "itemtype")
	public int getItemtype() {
		return itemtype;
	}

	@Column(name = "date")
	public String getDate() {
		return date;
	}
	
	

	public void setId(long id) {
		this.id = id;
	}


	public void setRest_id(long rest_id) {
		this.rest_id = rest_id;
	}


	public void setItemname(String itemname) {
		this.itemname = itemname;
	}


	public void setItemtype(int itemtype) {
		this.itemtype = itemtype;
	}


	public void setDate(String date) {
		this.date = date;
	}
	
	
}
