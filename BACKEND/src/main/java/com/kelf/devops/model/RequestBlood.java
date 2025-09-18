package com.kelf.devops.model;

import jakarta.persistence.*;

@Entity
@Table(name = "request_blood")
public class RequestBlood {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String bloodtype;
	
	@Column
	private String hospital;
	
	@Column
	private String Urgency;
	
	@Column
	private String status;
	
	@Column
	private String date;
	
	@Column
	private String acceptedorg;
	

	public String getAcceptedorg() {
		return acceptedorg;
	}

	public void setAcceptedorg(String acceptedorg) {
		this.acceptedorg = acceptedorg;
	}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    

    

    public String getUrgency() {
        return Urgency;
    }
    public void setUrgency(String urgency) {
        this.Urgency = urgency;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

	public String getBloodtype() {
		return bloodtype;
	}

	public void setBloodtype(String bloodtype) {
		this.bloodtype = bloodtype;
	}

	public String getHospital() {
		return hospital;
	}

	public void setHospital(String hospital) {
		this.hospital = hospital;
	}



   
    
}
