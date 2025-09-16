package com.kelf.devops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.kelf.devops.model.Hospital;
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

}
