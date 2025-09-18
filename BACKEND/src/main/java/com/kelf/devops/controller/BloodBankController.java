package com.kelf.devops.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.BloodData;
import com.kelf.devops.model.BloodDonor;
import com.kelf.devops.model.RequestBlood;
import com.kelf.devops.repository.BloodBankRepository;
import com.kelf.devops.repository.BloodDataRepository;
import com.kelf.devops.repository.BloodDonorRepository;
import com.kelf.devops.repository.RequestBlooodRepisotory;
import com.kelf.devops.service.BloodBankService;
import com.kelf.devops.service.BloodBankServiceimpl;

@RestController
@RequestMapping("/bloodbankapi")
@CrossOrigin(origins="*")
public class BloodBankController {
	
	@Autowired
	private BloodDonorRepository br;
	
	@Autowired
	private BloodDataRepository bdr;
	
	@Autowired
	private BloodBankServiceimpl bbs;
	
	@Autowired
	private RequestBlooodRepisotory rbr;
	
	
	
	@PostMapping("/registerbloodbank")
	public ResponseEntity<String> registerbloodbank(@RequestBody BloodBank bb) {
	    String s = bbs.addbloodbank(bb);
	    
	    if (s.contains("successfully")) {
	        return ResponseEntity.ok(s);  
	    } else {
	        return ResponseEntity.status(500).build(); 
	    }
	}
	
	@PostMapping("/registerblooddonor")
    public ResponseEntity<String> registerbloodDonor(@RequestBody BloodDonor b) {
    	 try
  	   {
  		 String s=bbs.addblooddonor(b);
  		  return ResponseEntity.ok(s); 
  	   }
  	   catch(Exception e)
  	   {
  		  
  		   return ResponseEntity.status(500).body("BloodDonor Registration Failed... ");
  	   }
    }
	@GetMapping("/viewallblooddonors")
    public ResponseEntity<List<BloodDonor>> getblooddonors() {
 	   try {
	            List<BloodDonor> requests = br.findAll();
	            return ResponseEntity.ok(requests);
	        } catch (Exception e) {
	             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
 	   
    }
    
    @GetMapping("/viewallbyblood")
    public ResponseEntity<List<BloodDonor>> getAllByBlood(
            @RequestParam("bloodType") String bloodType) {
        try {
            List<BloodDonor> requests = br.findByBloodType(bloodType);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
     	   return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

	 @GetMapping("/viewallbloodbanks")
	 public ResponseEntity<List<BloodBank>> getAllbloodbanks() {
	        try {
	            List<BloodBank> requests = bbs.viewall();
	            return ResponseEntity.ok(requests);
	        } catch (Exception e) {
	            return ResponseEntity.status(500).build();
	        }
	    }
	 @PostMapping("/checkbloodbanklogin")
	 public ResponseEntity<?> checkvoterlogin(@RequestBody BloodBank bb) {
		    try {
		        BloodBank b=bbs.findbloodbank(bb.getUsername(),bb.getPassword());

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
		 List<BloodData> list=bbs.viewalldata();
		 try{
	  		
	  		  return ResponseEntity.ok( list);
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
	 
	 @PostMapping("/addbloodrequest")
	 public ResponseEntity<String> addbloodrequest(@RequestBody RequestBlood r){
		 try
	  	   {
	  		  String s=bbs.addrequest(r);
	  		  return ResponseEntity.ok(s);
	  	   }
	  	   catch(Exception e)
	  	   {
	  		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  	   }
	 }
	 @PutMapping("/updatebloodstatus")
	 public ResponseEntity<String> updateBloodStatus(@RequestBody RequestBlood updatedRequest) {
	     try {
	         Optional<RequestBlood> optionalRequest = rbr.findById(updatedRequest.getId());

	         if (optionalRequest.isEmpty()) {
	             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	         }

	         RequestBlood existingRequest = optionalRequest.get();

	         if ("Accepted".equalsIgnoreCase(updatedRequest.getStatus())) {
	           
	             BloodData bloodData = bdr.findByOrgAndType(
	                 updatedRequest.getAcceptedOrg(),
	                 existingRequest.getBloodGroup()
	             );

	             if (bloodData == null) {
	                 return ResponseEntity.status(404).body(
	                     "No blood data found for type: " + existingRequest.getBloodGroup()
	                     + " and org: " + updatedRequest.getAcceptedOrg()
	                 );
	             }

	             if (bloodData.getAunits() < existingRequest.getUnitsNeeded()) {
	                 return ResponseEntity.badRequest().body(
	                     "Insufficient available units for type: " + existingRequest.getBloodGroup()
	                     + " in org: " + updatedRequest.getAcceptedOrg()
	                 );
	             }

	             // ✅ Deduct exact number of units requested
	             bloodData.setAunits(bloodData.getAunits() - existingRequest.getUnitsNeeded());
	             bloodData.setUsedunits(bloodData.getUsedunits() + existingRequest.getUnitsNeeded());
	             bdr.save(bloodData);

	             // ✅ Update request status and accepted org
	             existingRequest.setStatus(updatedRequest.getStatus());
	             existingRequest.setAcceptedOrg(updatedRequest.getAcceptedOrg());
	             rbr.save(existingRequest);

	             return ResponseEntity.ok("Request accepted and blood stock updated.");
	         } else {
	             // Handle other statuses
	             existingRequest.setStatus(updatedRequest.getStatus());
	             rbr.save(existingRequest);
	             return ResponseEntity.ok("Request status updated.");
	         }

	     } catch (Exception e) {
	         return ResponseEntity.status(500).body("Server error: " + e.getMessage());
	     }
	 }

 @GetMapping("/viewallbloodrequests")
	    public ResponseEntity<List<RequestBlood>> getAllbloodRequests() {
	        try {
	            List<RequestBlood> requests = rbr.findByStatusIgnoreCase("pending");
	            return ResponseEntity.ok(requests);
	        } catch (Exception e) {
	        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
 	 
 	 @GetMapping("/viewallrequests")
	    public ResponseEntity<List<RequestBlood>> getAllrequests() {
	        try {
	            List<RequestBlood> requests = rbr.findAll();
	            return ResponseEntity.ok(requests);
	        } catch (Exception e) {
	        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }

	 

}
