import React, { useContext, useEffect, useState } from "react"
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ntype,nid}) => {
  const [type,setType]=useState(ntype)
  const nav=useNavigate();
  useEffect(() => {
  },[])
  const handleLogout=()=>{
    if(window.confirm("Sure to Logout ?")){
      setType(current=>" ")
      nav(`/?type=" "&id=" "`)
    }
  }
  const PostHandler=()=>{
    alert("Please Login As a company")
    nav("/company/login")
  }
  const [show, setShow] = useState(false)
  return (
<body className='nav-body'>
    <div className="navbar" id="navbar">
      <header>
        <div className='logo'>
          <h1 id="navh1">JobNest</h1>
        </div>
        <nav className={`${show ? "mobile-nav" : "list"}`}>
          <ul id="nav-ul">
           <Link to={`/?type=${type}&id=${nid}`}><li>HOME</li></Link>
           <Link to={`/search?type=${type}&id=${nid}`}><li>SEARCH</li></Link>
           { type==="user" ?
           (<> 
            <Link to={`/myprofile?&id=${nid}`}><li>MY PROFILE</li></Link>
            <Link to={`/appliedjobs?type=${type}&id=${nid}`}><li>APPLIED JOBS</li></Link>
           <a><li onClick={handleLogout}>LOGOUT</li></a>
           </>)
           :
           (<>
            {type==="company" ?
            ( <>
              <Link to={`/postjob?type=${type}&id=${nid}`}><li>POST A JOB</li></Link>
              <Link to={`/appliedCandidates?type=${type}&id=${nid}`}><li>APPLIED CANDIDATES</li></Link>
              <Link to={`/view?type=${type}&id=${nid}`}><li>POSTED JOBS</li></Link>
              <a><li onClick={handleLogout}>LOGOUT</li></a>
              </>):(
                <>
                <a><li onClick={PostHandler}>POST A JOB</li></a>
                <Link to={`/user/login`}><li>LOGIN</li></Link>
                
                </>
              )
            }
          
            </>
            )
          }
          </ul>
        </nav>
      </header>
    </div>
    </body>
   
  )
}

export default NavBar