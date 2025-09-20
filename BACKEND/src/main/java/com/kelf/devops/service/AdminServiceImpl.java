package com.kelf.devops.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kelf.devops.model.Hospital;
import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.Admin;
import com.kelf.devops.repository.AdminRepository;
import com.kelf.devops.repository.HospitalRepository;
import com.kelf.devops.repository.BloodBankRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private HospitalRepository hospitalRepo;

    @Autowired
    private BloodBankRepository bloodBankRepo;

    @Autowired
    private AdminRepository adminRepo;

    // Existing methods
    @Override
    public List<Hospital> viewAllHospitals() {
        return hospitalRepo.findAll();
    }

    @Override
    public List<BloodBank> viewAllBloodBanks() {
        return bloodBankRepo.findAll();
    }

    @Override
    public String deleteHospital(int id) {
        if (hospitalRepo.existsById(id)) {
            hospitalRepo.deleteById(id);
            return "Hospital deleted successfully!";
        } else {
            return "Hospital not found!";
        }
    }

    @Override
    public String deleteBloodBank(int id) {
        if (bloodBankRepo.existsById(id)) {
            bloodBankRepo.deleteById(id);
            return "Blood Bank deleted successfully!";
        } else {
            return "Blood Bank not found!";
        }
    }

   
    @Override
    public Admin loginAdmin(String username, String password) {
        return adminRepo.findByUsernameAndPassword(username, password);
    }

	@Override
	public String addadmin(Admin a) {
		adminRepo.save(a);
		return "Added";
	}
}
