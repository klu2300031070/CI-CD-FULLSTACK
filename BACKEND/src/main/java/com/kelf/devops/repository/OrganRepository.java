package com.kelf.devops.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.devops.model.OrganDonor;


@Repository
public interface OrganRepository extends JpaRepository<OrganDonor, Long> {
public List<OrganDonor> findByBloodTypeAndOrgan(String bloodType, String organ);
}
