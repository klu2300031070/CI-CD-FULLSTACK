package com.kelf.devops.service;

import com.kelf.devops.model.BloodRequest;
import com.kelf.devops.repository.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodRequestServiceImpl implements BloodRequestService {

    @Autowired
    private BloodRequestRepository repository;

    @Override
    public BloodRequest saveRequest(BloodRequest request) {
        return repository.save(request);
    }

    @Override
    public List<BloodRequest> getRequestsByHospital(String username) {
        return repository.findByHospitalUsername(username);
    }

    @Override
    public void deleteRequest(int id) {
        repository.deleteById(id);
    }
}
