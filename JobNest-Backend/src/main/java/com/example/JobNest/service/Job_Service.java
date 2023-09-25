package com.example.JobNest.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.example.JobNest.Repo.Job_Repo;
import com.example.JobNest.model.jobs;

@Service
public class Job_Service {
	@Autowired Job_Repo job_repo;
	public String postServie(jobs jobs) {
		job_repo.save(jobs);
		return "New job Added Successfull!";
	}
	public List<jobs> getByIdAndTitle(int id,String title){
		return job_repo.GetByIdAndTitle(id,title);
	}
	public List<jobs> GetCredentialsService(){
		return job_repo.findAll();
	}
	public String UpdateCredentials(int id,jobs job) {

		job_repo.save(job);
		return id+" updated";
	}
	public String deleteCredentials(int id) {
		job_repo.deleteById(id);
		return "job deleted";
	}
	public Optional<jobs> GetByid(int id){
		return job_repo.findById(id);
	}
	public List<jobs> GetByComId(int id){
		return job_repo.GetByCompanyId(id);
	}
	public Page<jobs> findWithPaging(int page,int size,String field) {
    	Pageable paging=PageRequest.of(page-1, size).withSort(Sort.by(field).descending());       
	   return  job_repo.findAll(paging);
    }
	public List<jobs> SearchFn(String job_title, String location) {
		return job_repo.getByTitleAndLocation(job_title,location);
	}	
}
