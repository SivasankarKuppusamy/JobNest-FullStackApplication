import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function SecondPage() {
  const locationurl = useLocation();
  const queryParams = new URLSearchParams(locationurl.search);
  const u_email = queryParams.get('email');
  const fname = queryParams.get('fname');
  const lname = queryParams.get('lname');
  const uage = queryParams.get('age');
  const ugender = queryParams.get('gender');
  const upass = queryParams.get('password');
  const umobile = queryParams.get('mobile');
  const uloc = queryParams.get('location');
  const uskills = queryParams.get('skills');
  const[email,setEmail]=useState(u_email);
  const[first_name,setFName]=useState(fname)
  const[last_name,setLName]=useState(lname)
  const[age,setAge]=useState(uage)
  const[gender,setGender]=useState(ugender)
  const[password,setPassword]=useState(upass);
  const[location,setLocation]=useState(uloc);
  const[mobile,setMobile]=useState(umobile);
  const[skills,setSkills]=useState(uskills);
  const [experience,SetExperience]=useState("")
  const [previous_company,SetPreviousCompany]=useState("")
  const [degree,setDegree]=useState("")
  const [branch,setBranch]=useState("")
  const [description,setDescription]=useState("")
  const [YesOrNo,SetYesOrNo]=useState("")
  const nav=useNavigate();
  const details={first_name,last_name,age,gender,password,location,email,mobile,skills,experience,previous_company,degree,branch,description}
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
  const options = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const sendDetails=()=>{
    if(YesOrNo=="Yes"){
      if(degree.length===0||description.length===0||branch.length===0||experience.length===0){
        alert("Enter All Fields")
      }
      else if(degree.length===0||description.length===0||branch.length===0){
      alert("Enter All Fields")
      }
    }
    else{
    axios.post("http://localhost:8080/users",details).then((response)=>{console.log(response)})
    .catch((error)=>{console.log(error)})
    alert("Kindly login to apply for jobs")
    nav(`/user/login`)
    }
  }
  return (
    <body className='s-body'>
    <div className="signup"> <div class="container-s">
   <h2 id="h2">FEW MORE DETAILS {first_name}!</h2><div class="login3">
    <h3 id="h3">EDUCATIONAL QUALIFICATIONS</h3><br/>
    <label htmlFor="degSelect"> </label>
    Select Degree :<br/><br/> <select onChange={(e)=>(setDegree(e.target.value))}  className="Select2" id="degree" title="Select Degree">
        {Degree.map((deg) => (
          <option key={deg} value={deg}>
            {deg}
          </option>
          ))}
          </select>
         <br/>Specialization: <br/><br/><input onChange={(e)=>setBranch(e.target.value)} type="text" placeholder="Branch (or) Specialization"/>
      </div>
      <div class="login4">
      <h3>EXPERIENCE</h3><br/>
      <label htmlFor="degSelect"> </label>
      Do you have Any Previous Experience ? <br/><br/> {options.map((option) => (
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
        
        <> <input type="text" placeholder='Previous Company' onChange={(e)=>SetPreviousCompany(e.target.value)} /><></>
          <input type="number" placeholder='Number Of Years' onChange={(e)=>SetExperience(e.target.value)} /></> :<></>
      }
    <br/>A Little More About You:<br/><br/> <input onChange={(e)=>setDescription(e.target.value)} id="about" type="text" placeholder="Tell us a Little About You!"/>
    <button onClick={sendDetails}>SUBMIT</button>
              </div>
</div></div>
</body>
  )
}

export default SecondPage