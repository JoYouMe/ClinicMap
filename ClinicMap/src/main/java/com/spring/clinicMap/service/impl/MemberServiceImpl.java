package com.spring.clinicMap.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.clinicMap.entity.Member;
import com.spring.clinicMap.repository.MemberRepository;
import com.spring.clinicMap.service.MemberService;

// @Service 빈: 기능을 정의, 트랜잭션을 관리
@Service 
public class MemberServiceImpl implements MemberService{
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public Member join(Member member) {
		//Member 유효성 검사
		if(member == null || member.getUserId() == null) {
			throw new RuntimeException("Invalid Argument");
		}
		
		//userId 중복체크
		if(memberRepository.existsByUserId(member.getUserId())) {
			throw new RuntimeException("ID already exists");
		}
		
		return memberRepository.save(member);
	}
	
	@Override
	public Member login(String userId, String password) {
		
		Member loginMember = memberRepository.findByUserId(userId);
		
		if(loginMember != null && passwordEncoder.matches(password, loginMember.getPassword())) {
			return loginMember;
		}
		
		return null;
}
}