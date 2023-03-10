/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {  React,useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/signup.jpg";
import { API } from '../../../config';
import axios from "axios";
import { toast } from "react-toastify";
import SoftAlert from "components/SoftAlert";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [authenticated, setAuthenticated] = useState(false);




  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   role: '',
  // });

  

  const handleSubmit = async(e) => {
    e.preventDefault();

    await axios.post(`${API}/register`, {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      role: role
    })
    .then((res)=>{
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          type: 'success',
        });
        navigate('/login');
      } else {
        toast.error(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              type: 'error',
        });
      }
    })


  };

  const handleSetAgremment = () => setAgremment(!agreement);


  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form"  >
            <SoftBox mb={2}>
              <SoftInput 
              placeholder="Name"  
              onChange= {(e)=> setName(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput 
              placeholder="LastName" 
              onChange = {(e)=> setLastName(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput 
              type="email" 
              placeholder="Email"  
              onChange= {(e)=> setEmail(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput 
              type="password" 
              placeholder="Password"  
              onChange= {(e)=> setPassword(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput 
              placeholder="role"   
              onChange = {(e)=> setRole(e.target.value)}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree with the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton 
              variant="gradient" 
              color="dark" 
              type="submit" 
              fullWidth
              onClick = {handleSubmit}
              >
                sign up
                {authenticated && <SoftAlert color="success"  message="You are signed up!" />}
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
