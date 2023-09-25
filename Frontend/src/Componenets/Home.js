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
function Home() {
  const locationurl = useLocation();
  const queryParams = new URLSearchParams(locationurl.search);
  const type = queryParams.get('type');
  const id = queryParams.get('id');
  const [company_id, setCompany_id] = useState(0);
  const[location,setLocation]=useState('default');
  const [job_title, setJobTitle] = useState(' default');
  const [details, setjobDetails] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('date');
  const [job_id, setjobId] = useState(details.length > 0 ? details[0].company_id : '');
  const [companyDetails,setCompanyDetail]=useState([])
  const [count,setcount]=useState(0);
  const [applied,setapplied]=useState(false);
  const [getLinker,setLinkerDetails]=useState([]);
  const[showsearch,setShowsearch]=useState(false)
  const [SearchedDetails,setSearchedDetails]=useState('')


  const validate=getLinker.find(getLinker=>(getLinker.job_id==job_id&&getLinker.user_id==id))
  const apply=()=>{
    const user_id=id;
    const linkerDetails={user_id,job_id}
    if(window.confirm("Do you Want To Apply for this job ?")){
      if(validate){setapplied(true)}
      else{setapplied(false)}
    axios.post(`http://localhost:8080/linker`,linkerDetails).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
  }}
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const nav = useNavigate();
  const SearchFn=(e)=>{
   
      setShowsearch(true)
      
  }
  useEffect(() => {
if(location.length!=0||job_title!=0&&showsearch){
    axios
      .get(`http://localhost:8080/jobs/get/${currentPage}/${itemsPerPage}/${sortBy}`)
      .then((response) => {
        setjobDetails(response.data);
        const { content, totalPages } = response.data;
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
      getLinkers();

    }}, [currentPage, sortBy, type, queryParams,job_id,details,companyDetails,location,job_title]);
    const getLinkers=()=>{axios.get(`http://localhost:8080/linker/get`).then((response)=>{setLinkerDetails(response.data)}).catch((error)=>{console.log(error)})
  }
  const itemsPerPage = 3; 
  const showDetails = (id, com_id) => {
    setjobId(id);
    setCompany_id(com_id);
  };  
  useEffect(() => {
    if (job_id !== '') {
      axios
        .get(`http://localhost:8080/companies/${company_id}`)
        .then((response) => {
          setCompanyDetail(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if(showsearch){
      axios.get(`http://localhost:8080/jobs/search/${job_title}/${location}`).then((response)=>{setjobDetails(response.data)
      console.log(response.data)})
      .catch((error)=>{console.log(error)})
    }
  }, [company_id,job_id,details]);
  return (
    <div>
    <NavBar ntype={type} nid={id}/>
      <h1 className="search-head">Available Jobs</h1>
      
      <div className="container-home">
        <div className="left">
          <div className="containers">
            {details.content &&
              details.content.map((job) => (
                <div className="jobs-container" onClick={() => showDetails(job.job_id,job.company_id)} key={job.job_id}>
              
               <p id="ti"><SubtitlesIcon/> Job Title:<span>  {job.job_title}</span></p>
                 <p id="ti"><WorkIcon/>Job Type:   {job.job_type}</p>
                   <p id="ti"><LocationOnIcon/>Job Location:   {job.location}</p>
                    <p id="ti"><SchoolIcon/>&nbsp;Educational Qualification: {job.requirement}</p>
                    <p id="ti" className="date"><CalendarMonthIcon/>Posted On:   {job.date}</p>
                   <p id="sal" className="salary">&nbsp;&nbsp;&nbsp;Salary:₹{job.salary}<br/><br/></p>
                </div>
              ))}
            <Pagination
              className="page"
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                  fontSize: '15px',
                },
              }}
            />
          </div>
        </div>
        <div className="right">
          <div className="containers">
            {details.content &&
              details.content.map((job) =>
                job.job_id===job_id ? (
                  <div className="jobs-container"  key={job.job_id}>
                 {type=='user' ? !validate ? (<button onClick={apply} id="apply">APPLY!</button>):(<button  disabled={true} id="apply">APPLIED!</button>)
         :(null)}
                    <p id="detail-job"> JOB DETAILS</p>
                    <p id="t"> Job Title: {job.job_title}</p>
                    <p id="t">Job Type: {job.job_type}</p>
                    <p id="t">Salary {job.salary}</p>
                    <p id="t">Job Location: {job.location}</p>
                    <p id="t">Job Decription : {job.job_description}</p>
                    <p id="detail-job">QUALIFICATION AND OTHER DETAILS</p>
                    <p id="t">Educational Qualification: {job.requirement}</p>
                    <p id="t">Posted On: {job.date}</p>
                    <p id="t" >Experience Needed : {
                  companyDetails.needed_experience>0 ? <>
                    {companyDetails.needed_experience}</>
                :<>Fresher</>}</p>
                <p id="t">Will Join job in :{job.accepted}</p>
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
              )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
