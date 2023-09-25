import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { WindowSharp } from '@mui/icons-material';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Footer from './Footer';

function Search() {
  const locationurl = useLocation();
  const queryParams = new URLSearchParams(locationurl.search);
  const type = queryParams.get('type');
  const id = queryParams.get('id');
  const [company_id, setCompany_id] = useState(0);
  const [location, setLocation] = useState('default');
  const [job_title, setJobTitle] = useState('default');
  const [details, setJobDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('date');
  const [job_id, setJobId] = useState(details.length > 0 ? details[0].company_id : '');
  const [companyDetails, setCompanyDetail] = useState([]);
  const [count, setCount] = useState(0);
  const [applied, setApplied] = useState(false);
  const [getLinker, setLinkerDetails] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [searchedDetails, setSearchedDetails] = useState('');

  const validate = getLinker.find((linker) => linker.job_id === job_id && linker.user_id === id);

  const apply = () => {
    const user_id = id;
    const linkerDetails = { user_id, job_id };

    if (window.confirm('Do you want to apply for this job?')) {
      if (validate) {
        setApplied(true);
      } else {
        setApplied(false);
      }
      axios.post(`http://localhost:8080/linker`, linkerDetails)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const nav = useNavigate();

  const searchFn = (e) => {
    axios.get(`http://localhost:8080/jobs/search/${job_title}/${location}`)
        .then((response) => {
          setJobDetails(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    setShowSearch(true);
  };

  useEffect(() => {
    getLinkers();
  }, [currentPage, sortBy, type, queryParams, job_id, details, companyDetails, location, job_title]);

  const getLinkers = () => {
    axios.get(`http://localhost:8080/linker/get`)
      .then((response) => {
        setLinkerDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const itemsPerPage = 3;

  const showDetails = (id, com_id) => {
    setJobId(id);
    setCompany_id(com_id);
  };

  useEffect(() => {
    if (job_id !== '') {
      axios.get(`http://localhost:8080/companies/${company_id}`)
        .then((response) => {
          setCompanyDetail(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, [company_id, job_id, details]);

  return (
    <div>
      <NavBar ntype={type} nid={id} />
      <h1 className="search-head">Search Jobs</h1>
      <input
        type="text"
        onChange={(e) => {
          setJobTitle(e.target.value);
        }}
        className="search-com"
        placeholder="Search By Job"
      />
      <input
        type="text"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        className="search-city"
        placeholder="Search By City"
      />
      <button onClick={searchFn} className="search-btn">Find Jobs</button>
      <div className="container-home">
        <div className="left">
          <div className="containers">
            {details.map((job) => (
              <div className="jobs-container" onClick={() => showDetails(job.job_id, job.company_id)} key={job.job_id}>
                <p id="ti"><SubtitlesIcon /> Job Title:<span> {job.job_title}</span></p>
                <p id="ti"><WorkIcon />Job Type: {job.job_type}</p>
                <p id="ti"><LocationOnIcon />Job Location: {job.location}</p>
                <p id="ti"><SchoolIcon />&nbsp;Educational Qualification: {job.requirement}</p>
                <p id="ti" className="date"><CalendarMonthIcon />Posted On: {job.date}</p>
                <p id="sal" className="salary">&nbsp;&nbsp;&nbsp;Salary:₹{job.salary}<br /><br /></p>
              </div>
            ))}
          
          </div>
        </div>
        <div className="right">
          <div className="containers">
            {details.map((job) => (
              job.job_id === job_id ? (
                <div className="jobs-container" key={job.job_id}>
                  {type === 'user' ? (
                    !validate ? (
                      <button onClick={apply} id="apply">APPLY!</button>
                    ) : (
                      <button disabled={true} id="apply">APPLIED!</button>
                    )
                  ) : (
                    null
                  )}
                  <p id="detail-job"> JOB DETAILS</p>
                  <p id="t"> Job Title: {job.job_title}</p>
                  <p id="t">Job Type: {job.job_type}</p>
                  <p id="t">Salary {job.salary}</p>
                  <p id="t">Job Location: {job.location}</p>
                  <p id="t">Job Description: {job.job_description}</p>
                  <p id="detail-job">QUALIFICATION AND OTHER DETAILS</p>
                  <p id="t">Educational Qualification: {job.requirement}</p>
                  <p id="t">Posted On: {job.date}</p>
                  <p id="t">Experience Needed: {companyDetails.needed_experience > 0 ? companyDetails.needed_experience : 'Fresher'}</p>
                  <p id="t">Will Join job in: {job.accepted}</p>
                  <p id="detail-job">COMPANY DETAILS</p>
                  <p id="t">Company Name: {companyDetails.company_name}</p>
                  <p id="t">Company Location: {companyDetails.location}</p>
                  <p id="t">Company Email: {companyDetails.email}</p>
                  <p id="t">Company Mobile: {companyDetails.mobile}</p>
                  <p id="t">Posted By: {companyDetails.user_name}</p>
                </div>
              ) : (
                null
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
