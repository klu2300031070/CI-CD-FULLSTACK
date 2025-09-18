package com.kelf.devops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.BloodData;
import com.kelf.devops.repository.BloodBankRepository;
import com.kelf.devops.repository.BloodDataRepository;

@RestController
@CrossOrigin(origins="*")
public class BloodBankController {
	
	@Autowired
	private BloodBankRepository bbr;
	
	@Autowired
	private BloodDataRepository bdr;
	
	@PostMapping("/registerbloodbank")
	 public ResponseEntity<String> registerbloodbank(@RequestBody BloodBank bb) {
	    try {
	        
	        bbr.save(bb);

	       
	        List<String> bloodTypes = List.of("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-");

	        
	        for (String type : bloodTypes) {
	            BloodData bd = new BloodData();
	            bd.setType(type);
	            bd.setOrg(bb.getName());
	            bd.setAunits(0);
	            bd.setUsedunits(0);
	            bd.setDonatedunits(0);
	            bdr.save(bd);
	        }

	        return ResponseEntity.ok("BloodBank and default blood data registered successfully."); 
	    } catch(Exception e) {
	        e.printStackTrace(); 
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
	 @PostMapping("/checkbloodbanklogin")
	 public ResponseEntity<?> checkvoterlogin(@RequestBody BloodBank bb) {
		    try {
		        BloodBank b=bbr.findByUsernameAndPassword(bb.getUsername(),bb.getPassword());

		        if (b != null) {
		            return ResponseEntity.ok(b); 
		        } else {
		            return ResponseEntity.status(401).body("Invalid username or password");
		        }

		    } catch (Exception e) {
		        return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
		    }
		}
	 @PostMapping("/registerblooddata")
	 public ResponseEntity<String> registerblooddata(@RequestBody BloodData  bd) {
	    	 try
	  	   {
	  		 bdr.save(bd);
	  		  return ResponseEntity.ok("Registred Successfully"); 
	  	   }
	  	   catch(Exception e)
	  	   {
	  		  
	  		   return ResponseEntity.status(500).body("BloodBank Registration Failed... ");
	  	   }
	    }
	 @GetMapping("/viewallblooddata")
	 public ResponseEntity<List<BloodData>> getallblooddata(){
		 try{
	  		
	  		  return ResponseEntity.ok( bdr.findAll());
	  	   }
	  	   catch(Exception e)
	  	   {
	  		  
	  		   return ResponseEntity.status(500).build();
	  	   }
		 
	 }
	 @PutMapping("/decrement/{type}")
	 public ResponseEntity<BloodData> decrementBloodUnit(@PathVariable String type) {
	 	try {
	 		BloodData bloodData = bdr.findByType(type);

	 		if (bloodData == null) {
	 			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	 		}

	 		if (bloodData.getAunits() <= 0) {
	 			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	 		}

	 		bloodData.setAunits(bloodData.getAunits() - 1);
	 		bloodData.setUsedunits(bloodData.getUsedunits() + 1);

	 		bdr.save(bloodData);

	 		return ResponseEntity.ok(bloodData);

	 	} catch (Exception e) {
	 		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	 	}
	 }

	 

}
