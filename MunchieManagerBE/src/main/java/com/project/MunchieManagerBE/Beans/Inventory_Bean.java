package com.project.MunchieManagerBE.Beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Inventory")
public class Inventory_Bean {

	long id;
	long rest_id;
	String name;
	int amount;
	
	public Inventory_Bean() {}
	
	public Inventory_Bean(long id, long rest_id, String name, int amount) {
		super();
		this.id = id;
		this.rest_id = rest_id;
		this.name = name;
		this.amount = amount;
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

	@Column(name = "name")
	public String getName() {
		return name;
	}

	@Column(name = "amount")
	public int getAmount() {
		return amount;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setRest_id(long rest_id) {
		this.rest_id = rest_id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	
}
