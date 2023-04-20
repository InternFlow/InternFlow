/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, Alert } from "reactstrap";
import { useForm } from "react-hook-form";

// core components
import LoginNavbar from "components/Navbars/LoginNavBar";

function RegisterPage() {

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('company');
  const [errors, setErrors] = useState({});

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const history = useHistory();


  const handleSubmit = (event) => {
    event.preventDefault();
    // validate the form fields
    let errors = {};

    if (name.trim() === '') {
      errors.name = 'name is required';
      setAlertMessage(' Please Fill in with your whole name ! ');
      setShowAlert(true); 
    }

    if (email.trim() === '') {
      errors.email = 'Email is required';
      setAlertMessage(' Please Fill in with your email! ');
      setShowAlert(true); 
    } 
    
    else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      setAlertMessage(' your email is lacking ! ');
      setShowAlert(true); 
    }

    // else if (!/\S+@\S+\.\S+/.test(email)) {
    //   errors.email = 'Email is invalid';
    //   setAlertMessage(' your email is lacking ! ');
    //   setShowAlert(true); 
    // }

    if (password.trim() === '') {
      errors.password = 'Password is required';
      setAlertMessage(' Please Fill in with your password! ');
      setShowAlert(true); 
    }
    

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // submit the form data
    // ...
    const response = fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })

    })
    .then(()=>{
      setAlertMessage("Registration successful!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
       history.push("/sign-in");
      }, 8000);

      //window.alert("SignUp Successfull")
      //  toast.success('SignUp Successful'); // success message
      // <Alert color="success">SignUp Successful</Alert>
    
    }).catch((error)=> 
    {
      setAlertMessage('Registration Failed! ');
        setShowAlert(true);
    });

    // // registration successful
    // window.alert("SignUp Successfull");
    // // registration successful
    // history.push('/sign-in');

  }
  return (
    <>
      <LoginNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/company.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">SignUp As a Company</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon"
                    color="twitter"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <div>
                  <Form onSubmit={handleSubmit} className="register-form" method="POST">
                    <div>
                      <label>Company Name</label>
                      <Input
                        type="text"
                        id="name"
                        name="username"
                        value={name}
                        onChange={e => setName(e.target.value)}

                      />
                      {errors.name && <span>{errors.name}</span>}
                    </div>
                    <div>
                      <label>Email</label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      {errors.email && <span>{errors.email}</span>}
                    </div>

                    <div>
                      <label>Password</label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      {errors.password && <span>{errors.password}</span>}
                    </div>

                    <Button block className="btn-round" onClick={handleSubmit} color="danger" type="submit">
                      Register
                    </Button>

                    {showAlert && (
                      <Alert color="success">{alertMessage}</Alert>
                    )}
                  </Form>
                </div>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by SolutionsMakers
          </h6>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
