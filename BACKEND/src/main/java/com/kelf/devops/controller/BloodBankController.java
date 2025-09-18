package com.kelf.devops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.OrganDonor;
import com.kelf.devops.repository.BloodBankRepository;

@RestController
@CrossOrigin(origins="*")
public class BloodBankController {
	
	@Autowired
	private BloodBankRepository bbr;
	
	 @PostMapping("/registerbloodbank")
	    public ResponseEntity<String> registerbloodbank(@RequestBody BloodBank  bb) {
	    	 try
	  	   {
	  		 bbr.save(bb);
	  		  return ResponseEntity.ok("Registred Successfully"); 
	  	   }
	  	   catch(Exception e)
	  	   {
	  		  
	  		   return ResponseEntity.status(500).body("BloodBank Registration Failed... ");
	  	   }
	    }
	 @GetMapping("/viewallbloodbanks")
	    public ResponseEntity<List<BloodBank>> getAllbloodbanks() {
	        try {
	            List<BloodBank> requests = bbr.findAll();
	            return ResponseEntity.ok(requests);
	        } catch (Exception e) {
	            return ResponseEntity.status(500).build();
	        }
	    }

}
