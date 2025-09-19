package com.kelf.devops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kelf.devops.model.BloodData;

public interface BloodDataRepository extends JpaRepository<BloodData, Integer> {
	BloodData findByOrgAndType(String org, String type);
	BloodData findByType(String type);
	
	
	@Query("SELECT bd FROM BloodData bd WHERE bd.type = :bloodType")
    List<BloodData> findByType1(String bloodType);
    List<BloodData> findByTypeAndOrg(String type, String org);
}
