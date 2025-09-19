package com.kelf.devops.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.BloodData;
import com.kelf.devops.model.BloodDonor;
import com.kelf.devops.model.RequestBlood;
import com.kelf.devops.repository.BloodBankRepository;
import com.kelf.devops.repository.BloodDataRepository;
import com.kelf.devops.repository.BloodDonorRepository;
import com.kelf.devops.repository.RequestBlooodRepisotory;

@Service
public class BloodBankServiceimpl implements BloodBankService {

	@Autowired
	private BloodBankRepository bbr;
	
	@Autowired
	private BloodDataRepository bdr;
	
	@Autowired
    private BloodDonorRepository br;
	
	@Autowired
	private RequestBlooodRepisotory rbr;

	@Override
	public String addbloodbank(BloodBank bb) {
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

		        return "BloodBank and default blood data registered successfully."; 
		    } catch(Exception e) {
		        e.printStackTrace(); 
		        return "BloodBank Registration Failed... ";
		    }
		  

	}

	@Override
	public List<BloodBank> viewall() {

		return bbr.findAll();
	}
	
	public BloodBank findbloodbank(String a,String b) {
		return bbr.findByUsernameAndPassword(a,b);
	}
	
	public List<BloodData> viewalldata(){
		return bdr.findAll();
	}

	@Override
	public String addblooddonor(BloodDonor b) {
		 br.save(b);
  		 
	  	BloodData bd = bdr.findByOrgAndType(b.getOrg(), b.getBloodType());
	  	bd.setDonatedunits(bd.getDonatedunits() + 1);
	      bd.setAunits(bd.getAunits() + 1);
	      bdr.save(bd);
	      
	      return "Registred Successfully";
	}
	
	public String addrequest(RequestBlood rb) {
		
		rbr.save(rb);
		return "Request added Successfully";
		
	}
	public String Updatebloodstatus(RequestBlood r) {
		RequestBlood rb=rbr.findById(r.getId()).orElse(null);
		 if (rb == null) {
             return "No blood data found for type: " 
                 + rb.getBloodGroup() + " and org: " + rb.getAcceptedOrg();
         }
		 
		 BloodData bloodData = bdr.findByOrgAndType(rb.getAcceptedOrg(),rb.getBloodGroup());
		 
         if (bloodData.getAunits() <= 0) {
             return "Insufficient available units for type: " 
                 + rb.getBloodGroup() + " in org: " + rb.getAcceptedOrg();
         }
         
      
         bloodData.setAunits(bloodData.getAunits() - 1);
         bloodData.setUsedunits(bloodData.getUsedunits() + 1);
         bdr.save(bloodData);

        
         rb.setStatus(r.getStatus());
         rb.setAcceptedOrg(r.getAcceptedOrg());
         rbr.save(rb);
          return "Request accepted and blood stock updated.";
		
	}
	
	
	

}
