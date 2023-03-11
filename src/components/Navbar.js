import React from 'react';
import {Link,useLocation} from "react-router-dom";
import {useNavigate} from 'react-router'

const Navbar = () => {
   let navigate=useNavigate();
   let location =useLocation();
   const handleLogout =() =>{
    localStorage.removeItem("token");
    navigate("/login");
   }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">V Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {(localStorage.getItem('token'))&&<li className="nav-item">
          <Link className={`nav-link ${location==="/profile"?"active":""}`} to="/profile">Profile</Link>
        </li>}
        <li className="nav-item">
          <Link className={`nav-link ${location==="/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location==="/about"?"active":""}`} to="/about">About</Link>
        </li>
        
      </ul>
      { 
      (!localStorage.getItem('token'))?<form className="d-flex"> 
      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form> : 
      <form className="d-flex"> 
      <i className="fa-duotone fa-user"></i>
      <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
      </form>
      }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;