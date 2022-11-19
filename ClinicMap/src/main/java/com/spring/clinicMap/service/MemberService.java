package com.spring.clinicMap.service;

import com.spring.clinicMap.entity.Member;

public interface MemberService {
	Member join(Member member);
	
	Member login(String userId, String password);
}
