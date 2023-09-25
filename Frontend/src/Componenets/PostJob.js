import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../Styles/Post.css"
import NavBar from './NavBar';
function PostJob() {
  const [job_title,setJobTitle]=useState("")
  const [requirement,setRequirement]=useState("")
  const locationurl = useLocation();
  const queryParams = new URLSearchParams(locationurl.search);
  
    const id = queryParams.get('job_id');
    const company_id = queryParams.get('id');
    const[job_id,setjobId]=useState(id);
  const type = queryParams.get('type');
  const update = queryParams.get('update');
  const Degree = [
    'Select Degree',
    'Bachelor of Technology',
    'Bachelor of Engineering',
    'Bachelor of Science',
    'Bachelor of Education',
    'Master of Technology',
    'Master of Engineering',
    'Master of Science',
  ];
  const jobtype = [
    'Select type',
    'Full Time',
    'Part Time',
    'Work From Home'
  ];
  const quick = [
    'Select period',
    'Immediately',
    '1-5 days',
    '5-10 days',
    'Within a week',
    'Within a month'
    
  ];
  const range = [
    'Select range',
    '10k-20k',
    '20-50k',
    'Above 50k',
    'Above 1 lakh',
    
    
  ];
  const nav=useNavigate();
  const [needed_experience,setExperience]=useState(0);
  const [job_description,setDescription]=useState("");
  const [recdetails,setDetails]=useState([]);
  const [accepted,setAccepted]=useState("");
  const options = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const[YesOrNo,SetYesOrNo]=useState("")
  const[job_type,setJobType]=useState("")
  const[location,setLocation]=useState("")
  const[pincode,setpincode]=useState("")
  const[salary,setsalary]=useState("")
  const date = new Date().toLocaleDateString();
  console.log(date)
  const details={
    job_title,
    job_description,
    salary,
    pincode,
    location,
    requirement,
    date,
    needed_experience,
    job_type,
    accepted,
    company_id:company_id,
  }
  const updatedDetails = {
    job_title,
    job_description,
    salary,
    pincode,
    location,
    requirement,
    date,
    needed_experience,
    job_type,
    accepted,
    company_id: company_id,
  };

 
  const sendDetails=(event)=>{
    event.preventDefault();
    
    if(job_title.length===0||job_description.length===0||location.length===0||accepted.length===0||job_type.length===0||pincode.length===0||salary.length===0||needed_experience.length===0||requirement.length===0){
      alert("Enter All Fields")
    }
    else {
        axios.post(`http://localhost:8080/jobs`,details).
    then((response)=>{console.log(response)
    console.log(details)
    }).catch((error)=>{console.log(error)})
    sendToLinker();
    alert("Job Posted ! Job Seekers Will reach you soon")
  
      nav(`/?type=${"company"}&id=${company_id}`)
    }
  }
  const updateFn=(job_id)=>{
    if(job_id){
    axios.put(`http://localhost:8080/jobs/update/${job_id}`,updatedDetails).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
    alert("Job Updated !")
  nav(`/view?type=${"company"}&id=${company_id}`)
    }
  }
  const getDetails=()=>{
    if(job_id>0){
    axios.get(`http://localhost:8080/jobs/get`).then((response)=>{setDetails(current=>response.data)
    console.log(recdetails)
  }).catch((error)=>{console.log(error)})
}
}
 
  const sendToLinker=()=>{
    getDetails();
    const linkerDetails={job_id,id}
    axios.post("http://localhost:8080/linker",linkerDetails).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
  }

  useEffect(() => {
    setjobId(id);
    if(job_id){
    axios.get(`http://localhost:8080/jobs/${job_id}`).then((response) => {
      setJobTitle(response.data.job_title);
      setJobType(response.data.job_type);
      setRequirement(response.data.requirement);
      setAccepted(response.data.accepted);
      setDescription(response.data.job_description);
      setExperience(response.data.needed_experience); 
      setLocation(response.data.location);
      setpincode(response.data.pincode);
      setsalary(response.data.salary);
    });
  }
  }, []);
  

  
  return (
    < >
    <NavBar ntype={type} nid={company_id}/>
    <body className='post-body'>
    <div className="post"> <div class="container3">
    <h2 id="h2">ENTER JOB DETAILS !</h2><div class="login5">
    Job Title: <br/><br/><input value={job_title} onChange={(e)=>setJobTitle(e.target.value)} type="text" placeholder="Job Title"/>
     <label htmlFor="degSelect"> </label>
   <br/> Job Type :<br/><br/> <select value={job_type} onChange={(e)=>(setJobType(e.target.value))}  className="Select2" id="degree" title="Select Job Type">
         {jobtype.map((deg) => (
           <option key={deg} value={deg}>
             {deg}
           </option>
           ))}
           </select>
          <br/>
     <label htmlFor="degSelect"> </label>
    What is your Expected qualification ?<br/><br/> <select value={requirement} onChange={(e)=>(setRequirement(e.target.value))}  className="Select2" id="degree" title="Select requirement">
    {Degree.map((deg) => (
      <option key={deg} value={deg}>
      {deg}
      </option>
      ))}
      </select>
      <br/>
      
      <label htmlFor="degSelect"> </label>
      Do you need Any Previous Experience ? <br/><br/> {options.map((option) => (
        <label key={option.value}>
        <input id="radio2"
        type="radio"
        value={option.value}
        checked={YesOrNo === option.value}
        onChange={(e)=>SetYesOrNo(e.target.value)}
        />
        {option.label}
        </label> 
        ))}
        {
          YesOrNo=="Yes" ?
          (
            <><br/><br/>Years of Experience : <input value={needed_experience} type="number" placeholder='Years of Experience ' onChange={(e)=>setExperience(e.target.value)} /></>):
            <></>
          }
          <br/>Job Location:<br/><br/> <input value={location} onChange={(e)=>setLocation(e.target.value)}  type="text" placeholder="Job Location"/>
          </div> <div class="login6">
       <br/>Pincode:<br/><br/> <input value={pincode} onChange={(e)=>setpincode(e.target.value)} id="" type="text" placeholder="Pincode"/>
       <label htmlFor="degSelect"> </label>
       <br/>How Quickly will you Recruit?<br/><br/> <select value={accepted} onChange={(e)=>(setAccepted(e.target.value))}  className="Select2" id="degree" title="Select requirement">
       {quick.map((deg) => (
         <option key={deg} value={deg}>
         {deg}
         </option>
         ))}
         </select>
         <br/>
         
         
         <label htmlFor="degSelect"> </label>
         Salary Range Per Month: <br/><br/> <select value={salary} onChange={(e)=>(setsalary(e.target.value))}  className="Select2" id="degree" title="Select requirement">
         {range.map((deg) => (
             <option key={deg} value={deg}>
               {deg}
               </option>
               ))}
               </select>
               <br/>
               <br/>Job Description:<br/><br/> <input value={job_description} onChange={(e)=>setDescription(e.target.value)} id="about" type="text" placeholder="Tell us a  About the Job!"/>
            {update=="yes"?<button onClick={()=>updateFn((job_id))}>UPDATE JOB</button>: <button onClick={(event)=>{sendDetails(event)}}>POST JOB! </button>}
               </div>
               </div>
               </div></body></>
               )
              }
              
              export default PostJob