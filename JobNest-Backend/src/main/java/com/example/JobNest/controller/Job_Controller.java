package com.example.JobNest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JobNest.Repo.Job_Repo;
import com.example.JobNest.model.jobs;
import com.example.JobNest.service.Job_Service;

@RestController
@CrossOrigin("*")
@RequestMapping("/jobs")
public class Job_Controller {
	@Autowired
	Job_Service service;
	@Autowired Job_Repo repo;
	@GetMapping("/get/{currentPage}/{itemsPerPage}/{sortBy}")
	 public Page<jobs> getData(@PathVariable(value="currentPage") int page,
             @PathVariable(value= "itemsPerPage") int size,
             @PathVariable(value= "sortBy") String field) {
		 return service.findWithPaging(page, size, field);
	 }	
	 @GetMapping ("/search/{job_title}/{location}")
	 public List<jobs> SearchCon(@PathVariable String job_title,@PathVariable String location){
		 return service.SearchFn(job_title,location);
	 }
	@PostMapping
	public String postFn(@RequestBody jobs job) {
		return service.postServie(job);
	}
	@GetMapping("/get")
	public List<jobs> GetFn(){
		return service.GetCredentialsService();
	}
	@GetMapping("/getCom/{company_id}")
	public List<jobs> GetByComId(@PathVariable int company_id){
		return service.GetByComId(company_id);
	}
	@GetMapping("/{job_id}")
	public Optional<jobs> GetBYId(@PathVariable int job_id){
		return service.GetByid(job_id);
	}
	@GetMapping("/get/{company_id}/{job_title}")
	public List<jobs> GetByIdAndTitle(@PathVariable int company_id,@PathVariable String job_title){
		return service.getByIdAndTitle(company_id,job_title);
	}
	@DeleteMapping("/delete/{id}")
	public String DeleteFn(@PathVariable int id) {
		return service.deleteCredentials(id);
	}
	@PutMapping("/update/{job_id}")
	public String Update(@PathVariable int job_id,@RequestBody jobs jobs) {
		jobs updatejob = repo.getById(job_id);
		updatejob.setCompany_id(jobs.getCompany_id());
		updatejob.setUser_id(jobs.getUser_id());
		updatejob.setJob_title(jobs.getJob_title());
		updatejob.setLocation(jobs.getLocation());
		updatejob.setPincode(jobs.getPincode());
		updatejob.setJob_type(jobs.getJob_type());
		updatejob.setSalary(jobs.getSalary());
		updatejob.setJob_description(jobs.getJob_description());
		updatejob.setNeeded_experience(jobs.getNeeded_experience());
		updatejob.setRequirement(jobs.getRequirement());
		updatejob.setDate(jobs.getDate());
		repo.save(updatejob);
		return "Updated";
	}
}
