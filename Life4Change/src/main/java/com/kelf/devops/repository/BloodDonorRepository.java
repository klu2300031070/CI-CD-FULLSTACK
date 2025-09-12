package com.kelf.hackathon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.hackathon.model.BloodDonor;

@Repository
public interface BloodDonorRepository extends JpaRepository<BloodDonor, Long> {
public List<BloodDonor> findByBloodType(String bloodtype);
}
