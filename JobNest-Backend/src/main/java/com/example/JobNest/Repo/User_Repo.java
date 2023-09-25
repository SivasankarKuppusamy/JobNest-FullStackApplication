package com.example.JobNest.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.JobNest.model.users;


@Repository
public interface User_Repo extends JpaRepository<users, Integer>{

	users findByemail(String email);

}
