package com.kelf.devops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.kelf.devops.model.Hospital;
import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.Admin;
import com.kelf.devops.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @PostMapping("/add")
    public String add(@RequestBody Admin a) {
    	return adminService.addadmin(a);
    }

    @GetMapping("/hospitals")
    public List<Hospital> getAllHospitals() {
        return adminService.viewAllHospitals();
    }

    @GetMapping("/bloodbanks")
    public List<BloodBank> getAllBloodBanks() {
        return adminService.viewAllBloodBanks();
    }

    @DeleteMapping("/hospital/{id}")
    public String deleteHospital(@PathVariable int id) {
        return adminService.deleteHospital(id);
    }

    @DeleteMapping("/bloodbank/{id}")
    public String deleteBloodBank(@PathVariable int id) {
        return adminService.deleteBloodBank(id);
    }

    @PostMapping("/login")
    public Admin loginAdmin(@RequestBody Admin admin) {
        Admin existingAdmin = adminService.loginAdmin(admin.getUsername(), admin.getPassword());
        if (existingAdmin != null) {
            return existingAdmin; // status 200 by default
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
    }
}
