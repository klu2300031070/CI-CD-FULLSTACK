package com.kelf.devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelf.devops.model.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer>
{
  public Admin findByUsernameAndPassword(String username, String password);  
}
