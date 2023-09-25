import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Componenets/Login';
import Signup from './Componenets/Signup';
import Home from './Componenets/Home';
import SecondPage from './Componenets/SecondPage';
import CompaniesLogin from './Componenets/CompaniesLogin';
import CompanySignUp from './Componenets/CompanySignUp';
import ViewDetails from './Componenets/ViewDetails';
import PostJob from './Componenets/PostJob';
import AppliedCandidates from './Componenets/AppliedCandidates';
import AppliedJobs from './Componenets/AppliedJobs';
import Profile from './Componenets/Profile';
import Footer from './Componenets/Footer';
import Search from './Componenets/Search';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/user/login" element={<Login/>}/>
    <Route path="/company/login" element={<CompaniesLogin/>}/>
    <Route path="company/signup" element={<CompanySignUp/>}/>
    <Route path="user/signup" element={<Signup/>}/>
    <Route path="/Signup/1" element={<SecondPage/>}/>
    <Route path="/view" element={<ViewDetails/>}/>
    <Route path="/postjob" element={<PostJob/>}/>
    <Route path="/appliedCandidates" element={<AppliedCandidates/>}/>
    <Route path="/appliedjobs" element={<AppliedJobs/>}/>
    <Route path="/myprofile" element={<Profile/>}/>
    <Route path="/search" element={<Search/>}/>
  
    </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;
