package com.spring.clinicMap.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.clinicMap.entity.MyClinic;
import com.spring.clinicMap.repository.MyClinicRepository;
import com.spring.clinicMap.service.MyClinicService;

@Service
public class MyClinicServiceImpl implements MyClinicService {
	
	@Autowired
	MyClinicRepository myClinicRepository;
	
	@Override
	public MyClinic submitClinic (MyClinic myclinic) {
		return myClinicRepository.save(myclinic);
		
	}

}
