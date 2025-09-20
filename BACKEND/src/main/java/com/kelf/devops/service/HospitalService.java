package com.kelf.devops.service;

import java.util.List;

import com.kelf.devops.model.BloodData;
import com.kelf.devops.model.Hospital;
import com.kelf.devops.model.RequestBlood;

public interface HospitalService {
    Hospital registerHospital(Hospital hospital);
    Hospital getHospitalByUsername(String username);
    Hospital getHospitalByEmail(String email);
    Hospital loginHospital(String username, String password);
    
    Hospital getHospitalById(int id);
    Hospital updateHospital(int id, Hospital hospital);
    
    
    RequestBlood createRequest(RequestBlood requestBlood);
    List<RequestBlood> getAllRequests();
    RequestBlood getRequestById(Long id);
    List<RequestBlood> getRequestsByHospitalUsername(String hospitalUsername);
    List<RequestBlood> getRequestsByStatus(String status);
    RequestBlood updateRequest(Long id, RequestBlood requestBlood);
    void deleteRequest(Long id);
    
    
    List<BloodData> getAvailabilityByType(String bloodType);
    
    List<RequestBlood> getAcceptedRequestsByHospital(String hospitalUsername);
}
