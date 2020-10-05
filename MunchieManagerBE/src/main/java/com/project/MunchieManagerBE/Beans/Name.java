package com.project.MunchieManagerBE.Beans;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// All beans need entity tag and table name if they want to be stored in the database
@Entity
@Table(name = "Name")
public class Name {

	private long table_id;
	private String Fname;
	private String Lname;
	
	// Need a empty constructor for DB
	public Name() {}
	
	// Regular constructor
	public Name(long table_id, String Fname, String Lname) {
		this.table_id = table_id;
		this.Fname = Fname;
		this.Lname = Lname;
	}

	
	// All beans need getters & setters - press alt+shift+s and generate getters and setters
	// Then add tags
	
	
	// GETTERS
	
	// This is a special getter which is ID - required for table
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getTable_id() {
		return table_id;
	}
	
	@Column(name="fname", nullable=false)
	public String getFname() {
		return Fname;
	}
	
	@Column(name="lname", nullable=false)
	public String getLname() {
		return Lname;
	}

	
	// SETTERS
	
	public void setTable_id(long table_id) {
		this.table_id = table_id;
	}

	public void setFname(String fname) {
		Fname = fname;
	}

	public void setLname(String lname) {
		Lname = lname;
	}
	
	
	
	
	
	
}
