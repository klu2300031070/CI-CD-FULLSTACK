package com.kelf.devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kelf.devops.model.BloodData;

public interface BloodDataRepository extends JpaRepository<BloodData, Integer> {
	BloodData findByOrgAndType(String org, String type);
	BloodData findByType(String type);
}
