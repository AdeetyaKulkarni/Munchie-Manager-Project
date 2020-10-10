package com.project.MunchieManagerBE.Beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Employee")
public class Employee_Bean {

	long id;
	String firstname;
	String lastname;
	String email;
	String username;
	String password;
	String restaurant_name;
	String restaurant_address;
	int privilege;
	
	
	public void EmployeeBean() {}


	

	public Employee_Bean(long id, String firstname, String lastname, String email, String username, String password,
			String restaurant_name, String restaurant_address, int privilege) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.username = username;
		this.password = password;
		this.restaurant_name = restaurant_name;
		this.restaurant_address = restaurant_address;
		this.privilege = privilege;
	}




	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}


	@Column(name = "username")
	public String getUsername() {
		return username;
	}
	
	@Column(name = "firstname")
	public String getFirstname() {
		return firstname;
	}

	@Column(name = "lastname")
	public String getLastname() {
		return lastname;
	}

	@Column(name = "email")
	public String getEmail() {
		return email;
	}

	@Column(name = "password")
	public String getPassword() {
		return password;
	}

	@Column(name = "restaurantname")
	public String getRestaurant_name() {
		return restaurant_name;
	}

	@Column(name = "restaurantaddress")
	public String getRestaurant_address() {
		return restaurant_address;
	}

	@Column(name = "privilege")
	public int getprivilege() {
		return privilege;
	}

	
	

	public void setId(long id) {
		this.id = id;
	}


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}


	public void setLastname(String lastname) {
		this.lastname = lastname;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public void setRestaurant_name(String restaurant_name) {
		this.restaurant_name = restaurant_name;
	}


	public void setRestaurant_address(String restaurant_address) {
		this.restaurant_address = restaurant_address;
	}


	public void setprivilege(int privilege) {
		this.privilege = privilege;
	}
	
	
	
	
}
