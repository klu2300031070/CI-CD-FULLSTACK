package com.kelf.devops.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BloodData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int id;
	
	@Column
	private String type;
	
	@Column
	private String org;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOrg() {
		return org;
	}

	public void setOrg(String org) {
		this.org = org;
	}

	public int getUsedunits() {
		return usedunits;
	}

	public void setUsedunits(int usedunits) {
		this.usedunits = usedunits;
	}

	public int getAunits() {
		return aunits;
	}

	public void setAunits(int aunits) {
		this.aunits = aunits;
	}

	public int getDonatedunits() {
		return donatedunits;
	}

	public void setDonatedunits(int donatedunits) {
		this.donatedunits = donatedunits;
	}

	@Column
	private int usedunits;
	
	@Column
	private int aunits;
	
	@Column
	private int donatedunits;

}
