package com.kelf.devops.controller;

import com.kelf.devops.model.BloodRequest;
import com.kelf.devops.service.BloodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blood-request")
@CrossOrigin(origins = "*") // Allow requests from frontend
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;

    // Create a new blood request
    @PostMapping
    public BloodRequest createBloodRequest(@RequestBody BloodRequest request) {
        return bloodRequestService.saveRequest(request);
    }

    // Get all blood requests for a hospital
    @GetMapping("/hospital/{username}")
    public List<BloodRequest> getRequestsByHospital(@PathVariable String username) {
        return bloodRequestService.getRequestsByHospital(username);
    }

    // Delete a blood request by id
    @DeleteMapping("/{id}")
    public void deleteBloodRequest(@PathVariable int id) {
        bloodRequestService.deleteRequest(id);
    }
}
