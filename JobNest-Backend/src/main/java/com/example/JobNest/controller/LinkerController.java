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

import com.example.JobNest.Repo.LinkerRepo;
import com.example.JobNest.model.linker;
import com.example.JobNest.service.LinkerService;

@RestController
@RequestMapping("/linker")
@CrossOrigin("*")
public class LinkerController {
	@Autowired
	LinkerService service;
	@Autowired
	LinkerRepo repo;

	@PostMapping
	public String postFn(@RequestBody linker user) {
		return service.postServie(user);
	}
	@GetMapping("/get")
	public List<linker> GetFn(){
		return service.GetCredentialsService();
	}
	@GetMapping("/{id}")
	public Optional<linker> GetBYId(@PathVariable int id){
		return service.GetByid(id);
	}
	@DeleteMapping("/delete/{linker_id}")
	public String DeleteFn(@PathVariable int linker_id) {
		return service.deleteCredentials(linker_id);
	}
}
