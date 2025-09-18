package com.kelf.devops.model;

import jakarta.persistence.*;

@Entity
@Table(name = "request_blood")
public class RequestBlood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long id;

    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Column(name = "units_needed", nullable = false)
    private int unitsNeeded;

    @Column(name = "urgency", nullable = false)
    private String urgency;

    @Column(name = "status")
    private String status;

    @Column(name = "date")
    private String date;

    @Column(name = "accepted_org")
    private String acceptedOrg;

    @Column(name = "patient_name", nullable = false)
    private String patientName;

    @Column(name = "patient_age", nullable = false)
    private int patientAge;

    @Column(name = "patient_info")
    private String patientInfo;

    @Column(name = "hospital_username", nullable = false)
    private String hospitalUsername;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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

    public String getAcceptedOrg() {
        return acceptedOrg;
    }
    public void setAcceptedOrg(String acceptedOrg) {
        this.acceptedOrg = acceptedOrg;
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

    public String getHospitalUsername() {
        return hospitalUsername;
    }
    public void setHospitalUsername(String hospitalUsername) {
        this.hospitalUsername = hospitalUsername;
    }

    @Override
    public String toString() {
        return "RequestBlood [id=" + id + ", bloodGroup=" + bloodGroup +
               ", unitsNeeded=" + unitsNeeded + ", urgency=" + urgency +
               ", status=" + status + ", date=" + date +
               ", acceptedOrg=" + acceptedOrg + ", patientName=" + patientName +
               ", patientAge=" + patientAge + ", patientInfo=" + patientInfo +
               ", hospitalUsername=" + hospitalUsername + "]";
    }
}
