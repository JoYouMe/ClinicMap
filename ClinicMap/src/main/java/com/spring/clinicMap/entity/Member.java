package com.spring.clinicMap.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import lombok.Data;

@Entity
@Table(name="T_MEMBER", 
	   //userId 중복 방지
	   uniqueConstraints = {@UniqueConstraint(columnNames = "userId")})
@Data
@DynamicInsert
public class Member {
	@Id
	private String userId;
	
	private String password;
	
	@ColumnDefault("'ROLE_USER'")
	private String role;
	
	@Transient
	private String token;
}

