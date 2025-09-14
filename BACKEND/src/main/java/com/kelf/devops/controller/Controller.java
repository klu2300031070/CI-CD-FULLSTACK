package com.kelf.devops.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.kelf.devops.model.BloodData;
import com.kelf.devops.model.BloodDonor;
import com.kelf.devops.model.OrganDonor;
import com.kelf.devops.model.RequestBlood;
import com.kelf.devops.model.RequestOrgan;
import com.kelf.devops.repository.BloodDataRepository;
import com.kelf.devops.repository.BloodDonorRepository;
import com.kelf.devops.repository.OrganRepository;
import com.kelf.devops.repository.RequestBlooodRepisotory;
import com.kelf.devops.repository.RequestOrganRepository;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    private BloodDonorRepository br;
    
    @Autowired
    private OrganRepository or;
    
    @Autowired
    private RequestBlooodRepisotory rbr;
    
    @Autowired
    private RequestOrganRepository ror;
    
    @Autowired
	private BloodDataRepository bdr;

    @PostMapping("/registerblooddonor")
    public ResponseEntity<String> registerbloodDonor(@RequestBody BloodDonor b) {
    	 try
  	   {
  		 br.save(b);
  		 
  		BloodData bd = bdr.findByOrgAndType(b.getOrg(), b.getBloodType());

        if (bd != null) {
           
            bd.setDonatedunits(bd.getDonatedunits() + 1);
            bd.setAunits(bd.getAunits() + 1);

            
            bdr.save(bd);
        } else {
           
            return ResponseEntity.status(404).body("BloodData record not found for org and blood type.");
        }
  		  return ResponseEntity.ok("Registred Successfully"); // 200 - success
  	   }
  	   catch(Exception e)
  	   {
  		  
  		   return ResponseEntity.status(500).body("BloodDonor Registration Failed... ");
  	   }
    }
    	 
    	 
    	 @PostMapping("/registerorgandonor")
    	    public ResponseEntity<String> registerorgDonor(@RequestBody OrganDonor o) {
    	    	 try
    	  	   {
    	  		 or.save(o);
    	  		  return ResponseEntity.ok("Registred Successfully"); // 200 - success
    	  	   }
    	  	   catch(Exception e)
    	  	   {
    	  		 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	  	   }
    	    	 
    	
    		
    	}
    	 @GetMapping("/viewallorgans")
 	    public ResponseEntity<List<OrganDonor>> getAllOrgan() {
 	        try {
 	            List<OrganDonor> requests = or.findAll();
 	            return ResponseEntity.ok(requests);
 	        } catch (Exception e) {
 	        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 	        }
 	    }
    	  
    	 @PostMapping("/addbloodrequest")
    	 public ResponseEntity<String> addbloodrequest(@RequestBody RequestBlood r){
    		 try
  	  	   {
  	  		 rbr.save(r);
  	  		  return ResponseEntity.ok("Request added Successfully"); // 200 - success
  	  	   }
  	  	   catch(Exception e)
  	  	   {
  	  		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  	  	   }
    	 }
    	    
    	 @PostMapping("/addorganrequest")
    	 public ResponseEntity<String>  addorganrequsr(@RequestBody RequestOrgan o) {
    		 try
    	  	   {
    	  		 ror.save(o);
    	  		  return ResponseEntity.ok("Request added Successfully"); // 200 - success
    	  	   }
    	  	   catch(Exception e)
    	  	   {
    	  		 
    	  		   return ResponseEntity.status(500).body("OrganDonor Request Failed... ");
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
    	 
    	 @GetMapping("/viewallorganrequests")
    	 public ResponseEntity<List<RequestOrgan>> getAllPendingOrganRequests() {
    	     try {
    	         List<RequestOrgan> pendingRequests = ror.findByStatusIgnoreCase("pending");
    	         return ResponseEntity.ok(pendingRequests);
    	     } catch (Exception e) {
    	    	 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	     }
    	 }

    	 
    	 @PutMapping("/updateorganstatus")
    	 public ResponseEntity<String> updateOrganRequestStatus(@RequestBody RequestOrgan updatedRequest) {
    	     try {
    	         RequestOrgan existingRequest = ror.findById(updatedRequest.getId()).orElse(null);
    	         if (existingRequest == null) {
    	             return ResponseEntity.notFound().build();
    	         }

    	         existingRequest.setStatus(updatedRequest.getStatus());
    	         ror.save(existingRequest);
    	         return ResponseEntity.ok("Status updated successfully");
    	     } catch (Exception e) {
    	         return ResponseEntity.status(500).body("Failed to update status");
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

    	             // Correct lookup by org and type
    	             BloodData bloodData = bdr.findByOrgAndType(updatedRequest.getAcceptedorg(), existingRequest.getBloodtype());

    	             if (bloodData == null) {
    	                 return ResponseEntity.status(404).body("No blood data found for type: " 
    	                     + existingRequest.getBloodtype() + " and org: " + updatedRequest.getAcceptedorg());
    	             }

    	             if (bloodData.getAunits() <= 0) {
    	                 return ResponseEntity.badRequest().body("Insufficient available units for type: " 
    	                     + existingRequest.getBloodtype() + " in org: " + updatedRequest.getAcceptedorg());
    	             }

    	             // Update blood stock
    	             bloodData.setAunits(bloodData.getAunits() - 1);
    	             bloodData.setUsedunits(bloodData.getUsedunits() + 1);
    	             bdr.save(bloodData);

    	             // Update request status and accepted org
    	             existingRequest.setStatus(updatedRequest.getStatus());
    	             existingRequest.setAcceptedorg(updatedRequest.getAcceptedorg());
    	             rbr.save(existingRequest);

    	             return ResponseEntity.ok("Request accepted and blood stock updated.");
    	         } else {
    	             // For other status updates (if needed)
    	             existingRequest.setStatus(updatedRequest.getStatus());
    	             rbr.save(existingRequest);
    	             return ResponseEntity.ok("Request status updated.");
    	         }

    	     } catch (Exception e) {
    	         return ResponseEntity.status(500).body("Server error: " + e.getMessage());
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

       @GetMapping("/viewallorgansbybloodandorgan")
       public ResponseEntity<List<OrganDonor>> getAllByBloodAndOrgan(
               @RequestParam("bloodType") String bloodType, 
               @RequestParam("organ") String organ) {
           try {
               List<OrganDonor> requests = or.findByBloodTypeAndOrgan(bloodType, organ);
               return ResponseEntity.ok(requests);
           } catch (Exception e) {
        	   return new ResponseEntity<>(HttpStatus.NOT_FOUND);
           }
       }
       
       
}  