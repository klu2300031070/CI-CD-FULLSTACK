package com.kelf.devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.devops.model.Hospital;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Integer> {
    Hospital findByUsername(String username);
    Hospital findByEmail(String email);
    Hospital findByUsernameAndPassword(String username, String password);
}
