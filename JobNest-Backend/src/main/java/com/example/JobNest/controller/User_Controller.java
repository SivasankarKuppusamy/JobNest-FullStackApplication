package com.example.JobNest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobNest.Repo.User_Repo;
import com.example.JobNest.model.users;
import com.example.JobNest.service.User_Service;
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class User_Controller {
	@Autowired
	User_Service service;
	@Autowired User_Repo repo;

	@PostMapping
	public String postFn(@RequestBody users user) {
		return service.postServie(user);
	}
	@GetMapping("/get")
	public List<users> GetFn(){
		return service.GetCredentialsService();
	}
	@GetMapping("/{id}")
	public Optional<users> GetBYId(@PathVariable int id){
		return service.GetByid(id);
	}
	
	 @PutMapping("/update/{id}")
	    public String updateCred(@PathVariable int id,@RequestBody users user) {
	        repo.save(user);
	        return "Updated " +id;
	    }
	@DeleteMapping("/delete/{id}")
	public String DeleteFn(@PathVariable int id) {
		return service.deleteCredentials(id);
	}

}
