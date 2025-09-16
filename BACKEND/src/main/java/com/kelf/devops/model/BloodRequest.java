package com.kelf.devops.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@Entity
@Table(name = "blood_request_table")
public class BloodRequest {

    @Id
    @Column(name = "request_id")
    private int id;

    // Hospital Info
    @Column(name = "hospital_username", nullable = false)
    private String hospitalUsername;

    @Column(name = "hospital_name", nullable = false)
    private String hospitalName;

    @Column(name = "hospital_owner_name", nullable = false)
    private String hospitalOwnerName;

    @Column(name = "hospital_type", nullable = false)
    private String hospitalType;

    @Column(name = "hospital_address", nullable = false)
    private String hospitalAddress;

    @Column(name = "hospital_contact", nullable = false)
    private String hospitalContact;

    @Column(name = "hospital_email", nullable = false)
    private String hospitalEmail;

    @Column(name = "hospital_license_no", nullable = false)
    private String hospitalLicenseNo;

    // Blood Request Details
    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Column(name = "units_needed", nullable = false)
    private int unitsNeeded;

    @Column(name = "urgency", nullable = false)
    private String urgency;

    @Column(name = "patient_name", nullable = false)
    private String patientName;

    @Column(name = "patient_age", nullable = false)
    private int patientAge;

    @Column(name = "patient_info")
    private String patientInfo;

    @Column(name = "status", nullable = false)
    private String status = "PENDING";

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (this.id == 0) {
            this.id = ThreadLocalRandom.current().nextInt(1000, 1000000);
        }
        this.createdAt = LocalDateTime.now();
    }
    
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getHospitalUsername() {
		return hospitalUsername;
	}

	public void setHospitalUsername(String hospitalUsername) {
		this.hospitalUsername = hospitalUsername;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public String getHospitalOwnerName() {
		return hospitalOwnerName;
	}

	public void setHospitalOwnerName(String hospitalOwnerName) {
		this.hospitalOwnerName = hospitalOwnerName;
	}

	public String getHospitalType() {
		return hospitalType;
	}

	public void setHospitalType(String hospitalType) {
		this.hospitalType = hospitalType;
	}

	public String getHospitalAddress() {
		return hospitalAddress;
	}

	public void setHospitalAddress(String hospitalAddress) {
		this.hospitalAddress = hospitalAddress;
	}

	public String getHospitalContact() {
		return hospitalContact;
	}

	public void setHospitalContact(String hospitalContact) {
		this.hospitalContact = hospitalContact;
	}

	public String getHospitalEmail() {
		return hospitalEmail;
	}

	public void setHospitalEmail(String hospitalEmail) {
		this.hospitalEmail = hospitalEmail;
	}

	public String getHospitalLicenseNo() {
		return hospitalLicenseNo;
	}

	public void setHospitalLicenseNo(String hospitalLicenseNo) {
		this.hospitalLicenseNo = hospitalLicenseNo;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public int getUnitsNeeded() {
		return unitsNeeded;
	}

	public void setUnitsNeeded(int unitsNeeded) {
		this.unitsNeeded = unitsNeeded;
	}

	public String getUrgency() {
		return urgency;
	}

	public void setUrgency(String urgency) {
		this.urgency = urgency;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public int getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(int patientAge) {
		this.patientAge = patientAge;
	}

	public String getPatientInfo() {
		return patientInfo;
	}

	public void setPatientInfo(String patientInfo) {
		this.patientInfo = patientInfo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "BloodRequest [id=" + id + ", hospitalUsername=" + hospitalUsername + ", hospitalName=" + hospitalName
				+ ", hospitalOwnerName=" + hospitalOwnerName + ", hospitalType=" + hospitalType + ", hospitalAddress="
				+ hospitalAddress + ", hospitalContact=" + hospitalContact + ", hospitalEmail=" + hospitalEmail
				+ ", hospitalLicenseNo=" + hospitalLicenseNo + ", bloodGroup=" + bloodGroup + ", unitsNeeded="
				+ unitsNeeded + ", urgency=" + urgency + ", patientName=" + patientName + ", patientAge=" + patientAge
				+ ", patientInfo=" + patientInfo + ", status=" + status + ", createdAt=" + createdAt + "]";
	}
}
