package com.kelf.devops.service;

import com.kelf.devops.model.Hospital;

public interface HospitalService {
    Hospital registerHospital(Hospital hospital);
    Hospital getHospitalByUsername(String username);
    Hospital getHospitalByEmail(String email);
    Hospital loginHospital(String username, String password);
    
    Hospital getHospitalById(int id);
    Hospital updateHospital(int id, Hospital hospital);
}
