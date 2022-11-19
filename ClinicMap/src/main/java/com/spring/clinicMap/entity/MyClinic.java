package com.spring.clinicMap.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Table(name="T_MYCLINIC")
@Entity
@Data
@IdClass(MyClinicId.class)
public class MyClinic {
	@Id
	@ManyToOne
	@JoinColumn(name="userId")
	private Member member;
	
	@Id
	private String ykiho;
	
	private String yadmNm;
	
	private String addr;
	
	private String telno;
	
	

}
