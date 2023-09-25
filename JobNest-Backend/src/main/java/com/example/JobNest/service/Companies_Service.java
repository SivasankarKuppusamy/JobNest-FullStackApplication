package com.example.JobNest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.JobNest.Repo.Companies_Repo;
import com.example.JobNest.model.companies;

@Service
public class Companies_Service {
	@Autowired Companies_Repo repo;
	public String postServie(companies company) {
		repo.save(company);
		return "New compnay Added Successfull!";
	}
	public List<companies> GetCredentialsService(){
		return repo.findAll();
	}
	public String UpdateCredentials(int id,companies cred) {

		repo.save(cred);
		return id+" updated";
	}
	public String deleteCredentials(int id) {
		repo.deleteById(id);
		return "user account deleted";
	}
	public Optional<companies> GetByid(int id){
		return repo.findById(id);
	}
}
