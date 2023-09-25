package com.example.JobNest.Repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.JobNest.model.jobs;

import jakarta.transaction.Transactional;

@Repository
public interface Job_Repo extends JpaRepository<jobs, Integer>{
	@Transactional
	@Modifying
	@Query(value="SELECT * FROM jobs WHERE company_id = ?1 and job_title=?2", nativeQuery = true)
	public List<jobs> GetByIdAndTitle(int id, String title);
	@Transactional
	@Modifying
	@Query(value="SELECT * FROM jobs WHERE company_id = ?1", nativeQuery = true)
	public List<jobs> GetByCompanyId(int company_id);
	@Transactional
	@Modifying
	@Query(value="SELECT * FROM jobs WHERE job_title=?1 or location=?2", nativeQuery = true)
	public List<jobs> getByTitleAndLocation(String job_title, String location);


}
