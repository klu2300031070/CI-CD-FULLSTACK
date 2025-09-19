package com.kelf.devops.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kelf.devops.model.BloodData;
import com.kelf.devops.model.Hospital;
import com.kelf.devops.model.RequestBlood;
import com.kelf.devops.repository.BloodDataRepository;
import com.kelf.devops.repository.HospitalRepository;
import com.kelf.devops.repository.RequestBlooodRepisotory;

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
        existingHospital.setUsername(hospital.getUsername());
        existingHospital.setName(hospital.getName());
        existingHospital.setOwnerName(hospital.getOwnerName());
        existingHospital.setType(hospital.getType());
        existingHospital.setAddress(hospital.getAddress());
        existingHospital.setContact(hospital.getContact());
        existingHospital.setEmail(hospital.getEmail());
        existingHospital.setLicenseNo(hospital.getLicenseNo());
        if (hospital.getPassword() != null && !hospital.getPassword().isEmpty()) {
            existingHospital.setPassword(hospital.getPassword());
        }

        return hospitalRepository.save(existingHospital);
    }
    
    
    @Autowired
    private RequestBlooodRepisotory requestBloodRepository;

    @Override
    public RequestBlood createRequest(RequestBlood requestBlood) {
        return requestBloodRepository.save(requestBlood);
    }
    
    @Override
    public List<RequestBlood> getAllRequests() {
        return requestBloodRepository.findAll();
    }

    @Override
    public RequestBlood getRequestById(Long id) {
        return requestBloodRepository.findById(id).orElse(null);
    }

    @Override
    public List<RequestBlood> getRequestsByHospitalUsername(String hospitalUsername) {
        return requestBloodRepository.findByHospitalUsername(hospitalUsername);
    }

    @Override
    public List<RequestBlood> getRequestsByStatus(String status) {
        return requestBloodRepository.findByStatusIgnoreCase(status);
    }

    @Override
    public RequestBlood updateRequest(Long id, RequestBlood requestBlood) {
        Optional<RequestBlood> optional = requestBloodRepository.findById(id);
        if (optional.isPresent()) {
            RequestBlood existing = optional.get();
            // Update only necessary fields, except id
            existing.setBloodGroup(requestBlood.getBloodGroup());
         
            existing.setUrgency(requestBlood.getUrgency());
            existing.setStatus(requestBlood.getStatus());
            existing.setDate(requestBlood.getDate());
            existing.setAcceptedOrg(requestBlood.getAcceptedOrg());

            
            return requestBloodRepository.save(existing);
        } else {
            return null;
        }
    }

    @Override
    public void deleteRequest(Long id) {
        requestBloodRepository.deleteById(id);
    }
    
    
    @Autowired
    private BloodDataRepository bloodDataRepository;

    @Override
    public List<BloodData> getAvailabilityByType(String bloodType) {
        return bloodDataRepository.findByType1(bloodType);
    }
    
    
    @Override
    public List<RequestBlood> getAcceptedRequestsByHospital(String hospitalUsername) {
        return requestBloodRepository.findByHospitalUsernameAndStatusIgnoreCase(hospitalUsername, "ACCEPTED");
    }

}
