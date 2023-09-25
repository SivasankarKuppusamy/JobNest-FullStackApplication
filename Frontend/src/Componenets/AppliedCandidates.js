import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/ViewDetails.css"
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NavBar from './NavBar';
function AppliedCandidates() {
  const locationurl = useLocation();
  const queryParams = new URLSearchParams(locationurl.search);
  const company_id = queryParams.get('id');
  const type = queryParams.get('type');
  const [jobDetails,setjobDetails]=React.useState([])
  const [userDetails,setUserDetails]=React.useState([])
  const [linkerDetails,setLinkerDetails]=React.useState([])
  const [details,setDetails]=React.useState([])
  const getDetails=()=>{
    axios.get(`http://localhost:8080/jobs/getCom/${company_id}`).then((response)=>{setjobDetails(response.data)
  })
}
const nav=useNavigate();
React.useEffect(()=>{
  axios.get(`http://localhost:8080/linker/get`).then((response)=>{setLinkerDetails(response.data)}).catch((error)=>{console.log(error)})
  
  getDetails();
  getUser();
},[type,company_id,jobDetails,linkerDetails])
const DeletePost=(id)=>{
  if(window.confirm("Are you Sure?")){
    axios.delete(`http://localhost:8080/jobs/delete/${id}`).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
    window.location.reload();
  }
}
const matchJob=()=>{

}
const getUser=(user_id)=>{
  if(user_id){

    axios.get(`http://localhost:8080/users/${user_id}`).then((response)=>{setUserDetails(response.data)}).catch((error)=>{console.log(error)})
  }
}
return (
  <>
  <NavBar ntype={type} nid={company_id}/>
 <body className='view-body'>
  <h1 id="your">APPLIED CANDIDATES</h1>
  <TableContainer  id="table" component={Paper}>
  
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
  <TableRow>
  <TableCell>Candidate Name</TableCell>
  <TableCell align="center">Gender </TableCell>
  <TableCell align="center">Applied for  </TableCell>
  <TableCell align="center">Location</TableCell>
  <TableCell align="center">Degree</TableCell>
  <TableCell align="center">Branch</TableCell>
        </TableRow>
        </TableHead>
      <TableBody>
        {jobDetails.map((row) => (
        <>  {linkerDetails.map((linker)=>(
          row.job_id==linker.job_id &&linker.user_id>0 ?
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
        {getUser(linker.user_id)}
            <TableCell component="th" scope="row">
            {userDetails.first_name} {userDetails.last_name}
            </TableCell>
            
            <TableCell align="center">{userDetails.gender}</TableCell>
            <TableCell align="center">{row.job_title}</TableCell>
            <TableCell align="center">{userDetails.location}</TableCell>
            <TableCell align="center">{userDetails.degree}</TableCell>
            <TableCell align="center">{userDetails.branch}</TableCell>
            <TableCell align="center"><Link to={`/myprofile?type=${'company'}&id=${userDetails.user_id}`}><VisibilityIcon  id="edit"/></Link></TableCell>
            <TableCell align="center"><HighlightOffIcon onClick={()=>DeletePost(row.job_id)} id="delete"/></TableCell>
          </TableRow> :null
        ))
      }
      </>))}
      </TableBody>
    </Table>
  </TableContainer>
  </body>

</>
        )}

export default AppliedCandidates;