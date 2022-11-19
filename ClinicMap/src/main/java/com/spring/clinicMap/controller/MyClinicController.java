package com.spring.clinicMap.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.clinicMap.entity.Member;
import com.spring.clinicMap.entity.MyClinic;
import com.spring.clinicMap.service.MyClinicService;

@RestController
public class MyClinicController {
	
	@Autowired
	MyClinicService myClinicService;
	
	@PostMapping("/submit")
	public ResponseEntity<?> submitClinic(@RequestBody MyClinic myclinic, @AuthenticationPrincipal String userId){
		try {
			Member member = new Member();
			member.setUserId(userId);
			
			myclinic.setMember(member);
			MyClinic saveClinic = myClinicService.submitClinic(myclinic);
			
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("saveClinic", saveClinic);
			return ResponseEntity.ok().body(response);
			
		}catch(Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return ResponseEntity.badRequest().body(errorMap);
		}
		
	}


}
