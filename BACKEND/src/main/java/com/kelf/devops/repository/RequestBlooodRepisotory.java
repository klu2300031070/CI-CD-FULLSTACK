package com.kelf.devops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.devops.model.RequestBlood;

@Repository
public interface RequestBlooodRepisotory extends JpaRepository<RequestBlood, Long> {

	List<RequestBlood> findByStatusIgnoreCase(String status);

    List<RequestBlood> findByHospitalUsername(String hospitalUsername);
}
