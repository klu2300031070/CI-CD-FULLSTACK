package com.kelf.devops.service;

import java.util.List;

import com.kelf.devops.model.BloodBank;
import com.kelf.devops.model.BloodData;
import com.kelf.devops.model.BloodDonor;
import com.kelf.devops.model.RequestBlood;

public interface BloodBankService {
	public String addbloodbank(BloodBank bb);
	public List<BloodBank> viewall();
	public BloodBank findbloodbank(String a,String b);
	public List<BloodData> viewalldata();
	public String addblooddonor(BloodDonor b);
	public String Updatebloodstatus(RequestBlood r);

}
