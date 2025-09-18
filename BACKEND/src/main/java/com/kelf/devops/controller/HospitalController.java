package com.kelf.devops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.kelf.devops.model.Hospital;
import com.kelf.devops.model.RequestBlood;
import com.kelf.devops.repository.RequestBlooodRepisotory;
import com.kelf.devops.service.HospitalService;

@RestController
@RequestMapping("/hospitalapi")
@CrossOrigin(origins = "*")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping("/")
    public String home() {
        return "Hospital Registration API is running!";
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerHospital(@RequestBody Hospital hospital) {
        
        if (hospitalService.getHospitalByUsername(hospital.getUsername()) != null) {
            return new ResponseEntity<>("Username already taken.", HttpStatus.BAD_REQUEST);
        }

        if (hospitalService.getHospitalByEmail(hospital.getEmail()) != null) {
            return new ResponseEntity<>("Email already registered.", HttpStatus.BAD_REQUEST);
        }

        Hospital savedHospital = hospitalService.registerHospital(hospital);
        return new ResponseEntity<>(savedHospital, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginHospital(@RequestBody Hospital hospital) {

        Hospital existingHospital = hospitalService.loginHospital(
                hospital.getUsername(),
                hospital.getPassword()
        );

        if (existingHospital == null) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(existingHospital, HttpStatus.OK);
    }
    
    @GetMapping("/hospitals/{id}")
    public ResponseEntity<?> getHospitalById(@PathVariable int id) {
        Hospital hospital = hospitalService.getHospitalById(id);
        if (hospital == null) {
            return new ResponseEntity<>("Hospital not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(hospital, HttpStatus.OK);
    }

    @PutMapping("/hospitals/{id}")
    public ResponseEntity<?> updateHospital(@PathVariable int id, @RequestBody Hospital hospital) {
        Hospital updatedHospital = hospitalService.updateHospital(id, hospital);
        if (updatedHospital == null) {
            return new ResponseEntity<>("Hospital not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedHospital, HttpStatus.OK);
    }
    
    
    
    @PostMapping("/blood-requests")
    public ResponseEntity<RequestBlood> createRequest(@RequestBody RequestBlood requestBlood) {
        RequestBlood created = hospitalService.createRequest(requestBlood);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/blood-requests")
    public ResponseEntity<List<RequestBlood>> getAllRequests() {
        return ResponseEntity.ok(hospitalService.getAllRequests());
    }

    @GetMapping("/blood-requests/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Long id) {
        RequestBlood request = hospitalService.getRequestById(id);
        if (request == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found.");
        }
        return ResponseEntity.ok(request);
    }

    @GetMapping("/blood-requests/hospital/{username}")
    public ResponseEntity<List<RequestBlood>> getRequestsByHospitalUsername(@PathVariable String username) {
        return ResponseEntity.ok(hospitalService.getRequestsByHospitalUsername(username));
    }

    @GetMapping("/blood-requests/status/{status}")
    public ResponseEntity<List<RequestBlood>> getRequestsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(hospitalService.getRequestsByStatus(status));
    }

    @PutMapping("/blood-requests/{id}")
    public ResponseEntity<?> updateRequest(@PathVariable Long id, @RequestBody RequestBlood requestBlood) {
        RequestBlood updated = hospitalService.updateRequest(id, requestBlood);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found.");
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/blood-requests/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable Long id) {
        hospitalService.deleteRequest(id);
        return ResponseEntity.ok("Request deleted successfully!");
    }
}
