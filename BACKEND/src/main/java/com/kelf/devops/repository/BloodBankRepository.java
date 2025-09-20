package com.kelf.devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.devops.model.BloodBank;

@Repository
public interface BloodBankRepository extends JpaRepository<BloodBank, Integer> {
	public BloodBank findByUsernameAndPassword(String Username,String Password);

}
