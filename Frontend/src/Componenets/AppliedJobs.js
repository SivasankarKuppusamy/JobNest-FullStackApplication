import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/ViewDetails.css"
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NavBar from './NavBar';
function AppliedJobs() {
  const locationurl = useLocation();
  const queryParams = new URLSearchParams(locationurl.search);
  const user_id = queryParams.get('id');
  const type = queryParams.get('type');
  const [jobDetails,setjobDetails]=React.useState([])
  const [companyDetails,setCompanyDetails]=React.useState([])
  const [linkerDetails,setLinkerDetails]=React.useState([])
  const [details,setDetails]=React.useState([])
 
const nav=useNavigate();
React.useEffect(()=>{
  axios.get(`http://localhost:8080/linker/get`).then((response)=>{setLinkerDetails(response.data) 
}).catch((error)=>{console.log(error)})
axios.get(`http://localhost:8080/jobs/get`).then((response)=>{setjobDetails(response.data)})

},[type,jobDetails,linkerDetails])
const DeletePost=(linker_id)=>{
  if(window.confirm("Reterive Application ?")){
    axios.delete(`http://localhost:8080/linker/delete/${linker_id}`).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
    window.location.reload();
  }
}

const getCompany=(company_id)=>{
  axios.get(`http://localhost:8080/companies/${company_id}`).then((response)=>{setCompanyDetails(response.data)
  }).catch((error)=>{console.log(error)}) 
}
return (
  <>
  <NavBar ntype={type} nid={user_id}/>
 <body className='view-body'>
  <h1 id="your">APPLIED JOBS</h1>
  <TableContainer  id="table" component={Paper}>
  
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
  <TableRow>
  <TableCell>Job Title</TableCell>
  <TableCell align="center">Job Type </TableCell>
  <TableCell align="center">Location</TableCell>
  <TableCell align="center">Company Name</TableCell>
  <TableCell align="center">Date</TableCell>
  <TableCell align="center">Salary</TableCell>
  <TableCell align="center">Retrieve Application </TableCell>
        </TableRow>
        </TableHead>
      <TableBody> 
      {jobDetails.map((row) => (
<>
      {linkerDetails.map((linker)=>{
        if(user_id==linker.user_id&&row.job_id==linker.job_id)
         { 
          getCompany(row.company_id);
         return(
       
          <TableRow
            key={jobDetails.job_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
          
            <TableCell component="th" scope="row">
            {row.job_title} {companyDetails.last_name}
            </TableCell>
            <TableCell align="center">{row.job_type}</TableCell>
            <TableCell align="center">{row.location}</TableCell>
            <TableCell align="center">{companyDetails.company_name}</TableCell>
            <TableCell align="center">{row.date}</TableCell>
            <TableCell align="center">{row.salary}</TableCell>
            <TableCell align="center"><HighlightOffIcon onClick={()=>DeletePost(linker.linker_id)} id="delete"/></TableCell>
          </TableRow>
        )}}
      )
    }</>))}
      </TableBody>
    </Table>
  </TableContainer>
  </body>

</>
        )}

export default AppliedJobs;