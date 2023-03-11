import React from 'react';
import { useContext, useEffect } from "react";
import { NoteContext } from "../Context";
import {useNavigate} from 'react-router'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';

export default function Profile() {
    const {user,getUser} = useContext(NoteContext);
    let navigate=useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
          getUser();
        }
        else{
          navigate("/login");
        }
       
      });
  return (
    <section className="vh-90" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-2" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://th.bing.com/th/id/R.56dcf49b35b5e08a8161e9d2c300b7cb?rik=Bp84EakZX6BiAg&riu=http%3a%2f%2f2.bp.blogspot.com%2f--uuMx694yMM%2fTgdhg7uOOXI%2fAAAAAAAAAA8%2fUf4sbYI0_kE%2fs1600%2f5.jpg&ehk=7BiBFllT%2fmrp0KiEQ%2b587YRBb0TnDd3SMCCnqyi58pU%3d&risl=&pid=ImgRaw&r=0"
                    alt="Avatar" className="my-5" style={{ width: '100px',borderRadius:"5px" }} fluid />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{user.name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{user.phoneno}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted">Male</MDBCardText>
                      </MDBCol>
                    </MDBRow>
  

                    {/* <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div> */}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}