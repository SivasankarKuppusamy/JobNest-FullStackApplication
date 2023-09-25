package com.example.JobNest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class linker {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int linker_id;
	private int job_id;
	private int company_id;
	private int user_id;
	public int getLinker_id() {
		return linker_id;
	}
	public void setLinker_id(int linker_id) {
		this.linker_id = linker_id;
	}
	public int getJob_id() {
		return job_id;
	}
	public void setJob_id(int job_id) {
		this.job_id = job_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	


}
