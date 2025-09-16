package com.kelf.devops.service;

import com.kelf.devops.model.BloodRequest;
import java.util.List;

public interface BloodRequestService {
    
    BloodRequest saveRequest(BloodRequest request);
    
    List<BloodRequest> getRequestsByHospital(String username);
    
    void deleteRequest(int id);
}
