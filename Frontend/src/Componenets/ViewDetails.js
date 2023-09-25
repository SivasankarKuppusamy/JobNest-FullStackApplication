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

export default function ViewDetails() {
  const locationurl = useLocation();
    const queryParams = new URLSearchParams(locationurl.search);
    const company_id = queryParams.get('id');
    const type = queryParams.get('type');
    const [details,setDetails]=React.useState([])
    const getDetails=()=>{
      axios.get(`http://localhost:8080/jobs/getCom/${company_id}`).then((response)=>{setDetails(response.data)
    })
  }
  const nav=useNavigate();
  const updatePost=(id)=>{
    nav(`/postjob?type=${type}&id=${company_id}&job_id=${id}&update=${"yes"}`)
  }
  React.useEffect(()=>{
    getDetails();
  },[type,company_id])
  const DeletePost=(id)=>{
    if(window.confirm("Are you Sure?")){

      axios.delete(`http://localhost:8080/jobs/delete/${id}`).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
      window.location.reload();
    }
  }
  return (
    <>
    <NavBar ntype={type} nid={company_id}/>
   <body className='view-body'>
    <h1 id="your">YOUR OPENINGS</h1>
    <TableContainer  id="table" component={Paper}>
    
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
    <TableRow>
    <TableCell>Job Title</TableCell>
    <TableCell align="center">Job Type</TableCell>
    <TableCell align="center">Location</TableCell>
    <TableCell align="center">Salary</TableCell>
    <TableCell align="center">Experience </TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
          {details.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.job_title}
              </TableCell>
              <TableCell align="center">{row.job_type}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">{row.salary}</TableCell>
              <TableCell align="center">{row.needed_experience}</TableCell>
              <TableCell align="center"><EditIcon onClick={()=>updatePost(row.job_id)} id="edit"/></TableCell>
              <TableCell align="center"><HighlightOffIcon onClick={()=>DeletePost(row.job_id)} id="delete"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </body>
  
  </>
  );
}