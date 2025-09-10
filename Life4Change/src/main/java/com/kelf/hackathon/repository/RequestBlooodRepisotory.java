package com.kelf.hackathon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.hackathon.model.RequestBlood;

@Repository
public interface RequestBlooodRepisotory extends JpaRepository<RequestBlood, Long> {

	List<RequestBlood> findByStatusIgnoreCase(String string);

}
