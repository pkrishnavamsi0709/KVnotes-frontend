import React, { useState } from 'react';
import {useNavigate} from 'react-router'
import { useContext} from "react";
import { NoteContext } from "../Context";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';

function App(props) {
  let navigate=useNavigate();
  const {host} = useContext(NoteContext);

const [login,setlogin]=useState({email:"",password:""});

const handleChange =(e)=>{
  setlogin({...login,[e.target.name]:e.target.value})
}

const handleClick=async (e)=>{
  e.preventDefault();
  const response = await fetch(`${host}/api/auth/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({email:login.email,password:login.password})
});
const json =await response.json();
if(json.status){
localStorage.setItem('token',json.token);
navigate("/")
props.showAlert("Login Successful", "success");
}
else{
  props.showAlert("Invalid Details", "danger");
}
}

  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>


              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='form2' type='email' name='email'onChange={handleChange} value={login.email}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='form3' type='password' name="password" onChange={handleChange} value={login.password}/>
              </div>


              <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleClick}>Login</button>
              </div>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;