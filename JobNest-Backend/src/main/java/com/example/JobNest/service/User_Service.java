package com.example.JobNest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.JobNest.Repo.User_Repo;
import com.example.JobNest.model.users;

@Service
public class User_Service {
	@Autowired User_Repo user_repo;
	public String postServie(users credentials) {
		user_repo.save(credentials);
		return "New User Added Successfull!";
	}
	public List<users> GetCredentialsService(){
		return user_repo.findAll();
	}
	public String UpdateCredentials(int id,users cred) {

		user_repo.save(cred);
		return id+" updated";
	}
	public String deleteCredentials(int id) {
		user_repo.deleteById(id);
		return "user account deleted";
	}
	public Optional<users> GetByid(int id){
		return user_repo.findById(id);
	}

}
