package com.example.JobNest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.JobNest.Repo.LinkerRepo;
import com.example.JobNest.model.linker;

@Service
public class LinkerService {
	@Autowired
	LinkerRepo repo;
	public String postServie(linker linker) {
		repo.save(linker);
		return "New Link Added Successfull!";
	}
	public List<linker> GetCredentialsService(){
		return repo.findAll();
	}
	public String UpdateCredentials(int id,linker linker) {

		repo.save(linker);
		return id+" updated";
	}
	public String deleteCredentials(int id) {
		repo.deleteById(id);
		return "Link account deleted";
	}
	public Optional<linker> GetByid(int id){
		return repo.findById(id);
	}

}
