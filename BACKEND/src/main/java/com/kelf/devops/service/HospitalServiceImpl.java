package com.kelf.devops.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kelf.devops.model.Hospital;
import com.kelf.devops.repository.HospitalRepository;

@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public Hospital registerHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    @Override
    public Hospital getHospitalByUsername(String username) {
        return hospitalRepository.findByUsername(username);
    }

    @Override
    public Hospital getHospitalByEmail(String email) {
        return hospitalRepository.findByEmail(email);
    }
    
    @Override
    public Hospital loginHospital(String username, String password) {
        return hospitalRepository.findByUsernameAndPassword(username, password);
    }
    
    @Override
    public Hospital getHospitalById(int id) {
        Optional<Hospital> hospitalOpt = hospitalRepository.findById(id);
        return hospitalOpt.orElse(null);
    }

    @Override
    public Hospital updateHospital(int id, Hospital hospital) {
        Optional<Hospital> existingHospitalOpt = hospitalRepository.findById(id);
        if (!existingHospitalOpt.isPresent()) {
            return null;
        }
        Hospital existingHospital = existingHospitalOpt.get();

        // Update only editable fields
        existingHospital.setUsername(hospital.getUsername());
        existingHospital.setName(hospital.getName());
        existingHospital.setOwnerName(hospital.getOwnerName());
        existingHospital.setType(hospital.getType());
        existingHospital.setAddress(hospital.getAddress());
        existingHospital.setContact(hospital.getContact());
        existingHospital.setEmail(hospital.getEmail());
        existingHospital.setLicenseNo(hospital.getLicenseNo());

        // Update password only if provided (non-null and not empty)
        if (hospital.getPassword() != null && !hospital.getPassword().isEmpty()) {
            existingHospital.setPassword(hospital.getPassword());
        }

        return hospitalRepository.save(existingHospital);
    }

}
