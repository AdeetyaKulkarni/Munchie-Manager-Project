package com.project.MunchieManagerBE.Beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Menu")
public class Menu_Bean {

	long id;
	String name;
	long rest_id;
	int ingredients[];
	int quantity[];
	int price;
	boolean visible;
	
	public Menu_Bean() {}
	
	
	public Menu_Bean(long id, String name, long rest_id, int[] ingredients, int[] quantity, int price,
			boolean visible) {
		super();
		this.id = id;
		this.name = name;
		this.rest_id = rest_id;
		this.ingredients = ingredients;
		this.quantity = quantity;
		this.price = price;
		this.visible = visible;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	@Column(name = "rest_id")
	public long getRest_id() {
		return rest_id;
	}

	@Column(name = "ingredients")
	public int[] getIngredients() {
		return ingredients;
	}

	@Column(name = "quantity")
	public int[] getQuantity() {
		return quantity;
	}

	@Column(name = "price")
	public int getPrice() {
		return price;
	}

	@Column(name = "visibility")
	public boolean isVisible() {
		return visible;
	}


	public void setId(long id) {
		this.id = id;
	}


	public void setName(String name) {
		this.name = name;
	}


	public void setRest_id(long rest_id) {
		this.rest_id = rest_id;
	}


	public void setIngredients(int[] ingredients) {
		this.ingredients = ingredients;
	}


	public void setQuantity(int[] quantity) {
		this.quantity = quantity;
	}


	public void setPrice(int price) {
		this.price = price;
	}


	public void setVisible(boolean visible) {
		this.visible = visible;
	}
	
	
	
	
	
	
}
