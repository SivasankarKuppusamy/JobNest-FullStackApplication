import React, { useEffect, useState } from 'react'
import "../Styles/Login.css"
import axios from 'axios';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
function CompaniesLogin() {
  const [details,SetDetails]=useState([]);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[LoggedIn,SetLoggedIn]=useState(false)
  const nav=useNavigate();
  useEffect(()=>{getDetails();},[])
  const getDetails=()=>{
    axios.get("http://localhost:8080/companies/get").then((response)=>{SetDetails(response.data)
    console.log(details)
  }).catch((error)=>{console.log(error)})
}
const validateUser = details.find(details => (details.email === email && details.password === password));
console.log({validateUser})
 const Authenticate=(event)=>{
   event.preventDefault();
   if(email.length===0){
     alert("Enter Email")
   }
   else if(password.length===0){
     alert("Enter Password")
   }
   else if(!validateUser){
     alert("Wrong UserName or Password")
   }
   else {
     const LoggedIn=true;
     nav(`/?type=${"company"}&id=${validateUser.company_id}`)
     window.location.reload(true)
   }
 }
  return (
    <>    <NavBar />
 
    <body className='login-body'>
    <div class="container-main">
    <div class="login">
       <div class="container">
            <h1>COMPANY LOG IN</h1>
          Emai :  <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email"/>
            Password:<input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/><br/>
            <button onClick={Authenticate}>LOG IN</button>
            </div>
    </div>
    <div class="register">
        <div class="container">
        <PersonAddAltIcon id="icon"/>
        <h2>Hello,friend!</h2>
        <p>Register Your Company And find the best Job Seekers !</p>
           <Link to="/company/signup"> <button id="register-button">Register </button></Link>
        </div>
    </div>  
  </div>
  </body>
  </>
  )
}

export default CompaniesLogin;