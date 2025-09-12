package com.kelf.devops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.devops.model.RequestOrgan;

@Repository
public interface RequestOrganRepository extends JpaRepository<RequestOrgan, Long> {

	List<RequestOrgan> findByStatusIgnoreCase(String string);

}
