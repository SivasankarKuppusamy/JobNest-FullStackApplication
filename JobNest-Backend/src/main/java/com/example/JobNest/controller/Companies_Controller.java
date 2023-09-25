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

import com.example.JobNest.Repo.Companies_Repo;
import com.example.JobNest.model.companies;
import com.example.JobNest.service.Companies_Service;

@RestController
@CrossOrigin("*")
@RequestMapping("/companies")
public class Companies_Controller {
	@Autowired
	Companies_Service service;
	@Autowired Companies_Repo repo;

	@PostMapping
	public String postFn(@RequestBody companies companies) {
		return service.postServie(companies);
	}
	@GetMapping("/get")
	public List<companies> GetFn(){
		return service.GetCredentialsService();
	}
	@GetMapping("/{id}")
	public Optional<companies> GetBYId(@PathVariable int id){
		return service.GetByid(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public String DeleteFn(@PathVariable int id) {
		return service.deleteCredentials(id);
	}

}
