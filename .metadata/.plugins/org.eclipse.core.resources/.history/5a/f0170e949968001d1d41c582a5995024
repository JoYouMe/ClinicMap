package com.spring.clinicMap.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.clinicMap.entity.MyClinic;

public interface MyClinicService {
	
	// 병원 정보 저장
	MyClinic submitClinic(MyClinic myclinic);
	
	// 저장된 병원 목록
	Page<MyClinic> getMyClinicList(Pageable pageable);
	
	// 병원 정보 삭제
	void deleteClinic(MyClinic myclinic);
	
	
}
