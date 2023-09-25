package com.example.JobNest.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.JobNest.model.companies;

@Repository
public interface Companies_Repo extends JpaRepository<companies, Integer> {
	
}
