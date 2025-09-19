package com.kelf.devops.service;

import java.util.List;
import com.kelf.devops.model.Hospital;
import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.Admin;

public interface AdminService {
    List<Hospital> viewAllHospitals();
    List<BloodBank> viewAllBloodBanks();
    String deleteHospital(int id);
    String deleteBloodBank(int id);
    String addadmin(Admin a);

    Admin loginAdmin(String username, String password);
}
