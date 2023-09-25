import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/Signup.css"
import NavBar from './NavBar';
function Signup() {
  const [details,SetDetails]=useState([]);
  const[email,setEmail]=useState("");
  const[first_name,setFName]=useState("")
  const[last_name,setLName]=useState("")
  const[age,setAge]=useState("")
  const[gender,setGender]=useState("")
  const[password,setPassword]=useState("");
  const[location,setLocation]=useState("");
  const[mobile,setMobile]=useState("");
  const[skills,setSkills]=useState("");
  const nav=useNavigate();
  const options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  const handleGenderChange=(e)=>{
    setGender(e.target.value)
  }
 const next=(event)=>{
   event.preventDefault()
  if(first_name.length===0||last_name.length===0||age.length===0||password.length===0||email.length===0||mobile.length===0||gender.length===0||skills.length===location.length===0){
    alert("Enter All Fields")
  }
  else if(mobile.length!=10){
    alert("Enter Correct Mobile Number")
  }
 
  if(password.length<8){
    alert("Password Should be minimum of 8 characters")
  }
  else {
  nav(`/Signup/1?fname=${first_name}&lname=${last_name}&gender=${gender}&password=${password}&location=${location}&mobile=${mobile}&skills=${skills}&age=${age}&email=${email}`)
 }
 }
  return (
    <>
     <NavBar/>

    <body className='signup-body'>

    <div className='signup'> 
    <div class="container1">
    <h1>SIGN UP</h1>
    <div class="login1">
           First Name: <br/><input onChange={(e)=>setFName(e.target.value)} type="text" placeholder="First Name"/>
           <br/>Last Name: <br/>  <input onChange={(e)=>setLName(e.target.value)} type="text" placeholder="Last Name"/><br/>
            Gender :  {options.map((option) => (
              <label key={option.value}>
              &nbsp;&nbsp;&nbsp; <input id="radio"
              type="radio"
              value={option.value}
                  checked={gender === option.value}
                  onChange={handleGenderChange}
                  />
                {option.label}&nbsp;&nbsp;
                </label> 
                ))}
                <br/>Age :<br/> <input onChange={(e)=>setAge(e.target.value)} type="text" placeholder="Age"/><br/>
                <br/> Mobile :<br/><input onChange={(e)=>setMobile(e.target.value)} type="text" placeholder="Mobile"/>
              </div>
              <div class="login2">
             Location :<br/> <input onChange={(e)=>setLocation(e.target.value)} type="text" placeholder="Enter Your Location"/>
             <br/>Skills :<br/> <input onChange={(e)=>setSkills(e.target.value)} type="text" placeholder="Enter Your Skills"/>
             <br/>Email :<br/> <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email"/>
             <br/>Password : <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/><br/>
             <button onClick={next} id="next">NEXT</button>
              </div>
</div></div>
</body>
</>
  )
}

export default Signup