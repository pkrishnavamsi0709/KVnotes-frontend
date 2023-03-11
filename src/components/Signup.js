import React, { useState } from "react";
import { useNavigate } from "react-router";
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
} from "mdb-react-ui-kit";

function App(props) {
  let navigate = useNavigate();
  const {host} = useContext(NoteContext);

  const [login, setlogin] = useState({
    name: "",
    email: "",
    phoneno: "",
    gender:"",
    password: "",
    rpassword: "",
  });

  const handleChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: login.name,
        email: login.email,
        phoneno: login.phoneno,
        gender:login.gender,
        password: login.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.status) {
      console.log(json.token);
      localStorage.setItem("token", json.token);
      navigate("/login");
      props.showAlert("Registration Successful", "success");
    } else {
      props.showAlert("Enter the valid Details", "danger");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "35px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                Sign up
              </p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label="Your Name"
                  id="form1"
                  type="text"
                  className="w-100"
                  name="name"
                  value={login.name}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  label="Your Email"
                  id="form2"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa-solid fa-phone me-3"></i>
                <MDBInput
                  label="Phone no"
                  id="form2"
                  type="number"
                  name="phoneno"
                  value={login.phoneno}
                  onChange={handleChange}
                />
              </div>

              {(login.phoneno.length !==10 && login.phoneno.length>0) &&<div className="mb-3">
                  <label>phone no must be 10 character</label>
              </div>}

              <div  className="mb-3 ">
              <i className="fa-solid fa-person me-3"></i>
                Gender:
              <input className="mx-2" type="radio" name="gender" value="Male" onChange={handleChange}/>Male
              <input className="mx-2"type="radio" name="gender" value="Female" onChange={handleChange}/>Female
              </div>
              

              {/* <div className="mb-4">
              {(login.gender!=='M'||login.gender!=='F' || login.gender!=='O' || login.gender.length!==0) && (
                  <label>Gender must be either M or F or O</label>
                )}
              </div> */}


              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label="Password"
                  id="form3"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size="lg" />
                <MDBInput
                  label="Repeat your password"
                  id="form4"
                  type="password"
                  name="rpassword"
                  value={login.rpassword}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                {login.password !== login.rpassword && (
                  <label>Password didn't match</label>
                )}
              </div>
              <div className="mb-4">
              {(login.password.length <3 && login.password.length>0) && (
                  <label>password must be at least 5 characters</label>
                )}
              </div>
              


              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  disabled={
                    login.password !== login.rpassword ||
                    login.password.length < 5
                  }
                >
                  Register
                </button>
              </div>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
