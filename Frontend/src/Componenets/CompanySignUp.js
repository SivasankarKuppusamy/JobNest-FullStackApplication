import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/Signup.css"
import NavBar from './NavBar';
function CompanySignUp() {
  const[email,setEmail]=useState("");
  const[company_name,setCompanyName]=useState("")
  const[password,setPassword]=useState("");
  const[con_password,setconPass]=useState("");
  const[user_name,setUname]=useState("")
  const[mobile,setMobile]=useState("");
  const[location,setLocation]=useState("");
  const[category,setCategory]=useState("");
  const nav=useNavigate();

  const details={company_name,password,email,mobile,user_name,category,location}
 const sendDetails=(event)=>{
   event.preventDefault()
  if(company_name.length===0||password.length===0||email.length===0||mobile.length===0||user_name.length===0||category.length===0){
    alert("Enter All Fields")
  }
  else if(mobile.length!==10){
    alert("Enter Correct Mobile Number")
  }
  else if(password!=con_password){
    alert("Check Password and Confirm Password")
  }
  else if(password.length<8){
    alert("Password Should be minimum of 8 characters")
  }
  else {
    axios.post("http://localhost:8080/companies",details).then((response)=>{console.log(response)})
    .catch((error)=>{console.log(error)})
    alert("Kindly login to Post a job")
    nav(`/company/login`)
 }
 }
 const categorylist = [
  'Select Category',
  'Software based company',
  'Agri based company',
  'Medical based company',
  'Cotton based company',
  'Hardware based company',
  'Service  company',
  'Product  company',
  
];
  return (
  <>    <NavBar />

    <body className='signup-body'>

    <div className='signup'> 
    <div class="container1">
    <h1>SIGN UP</h1>
    <div class="login1">
           Company Name: <br/><input onChange={(e)=>setCompanyName(e.target.value)} type="text" placeholder="First Name"/>
           <br/>Email :<br/> <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email"/>
        <br/>Which Kind Company is Yours :<br/><br/> <select onChange={(e)=>setCategory(e.target.value)}  className="Select2" id="cat" title="Select Category">
           {categorylist.map((cat) => (
             <option key={cat} value={cat}>
               {cat}
             </option>
             ))}
             </select>
           <br/>Your Name: <br/>  <input onChange={(e)=>setUname(e.target.value)} type="text" placeholder="Your Name"/><br/>
           </div>
           <div class="login2">
           Where is your Company Located :<br/> <input onChange={(e)=>setLocation(e.target.value)} type="text" placeholder="Location"/>
           <br/>Mobile :<br/> <input onChange={(e)=>setMobile(e.target.value)} type="text" placeholder="Mobile Number"/>
           <br/>Password : <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/><br/>
           <br/>Confirm Password : <input onChange={(e)=>setconPass(e.target.value)} type="password" placeholder="Confirm Password"/><br/>
             <button onClick={sendDetails} id="next">SIGN UP</button>
              </div>
</div></div>
</body>
</>
  )
}

export default CompanySignUp