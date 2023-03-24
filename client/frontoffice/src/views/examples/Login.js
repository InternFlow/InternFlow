/* eslint-disable react/jsx-no-comment-textnodes */
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
import React, { useState } from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, Alert } from "reactstrap";

// core components
import ResgisterNavBar from "components/Navbars/RegisterNavbar";
import { useHistory } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
 

  // Handle Login
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const history = useHistory();
  



  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate the form fields
    let errors = {};
    if (email.trim() === '') {
      errors.email = 'Email is required';
      setAlertMessage(' Please Fill in with your email! ');
      setShowAlert(true); 
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      setAlertMessage(' your email is lacking ! ');
      setShowAlert(true); 
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
      setAlertMessage(' Please Fill in with your password! ');
      setShowAlert(true); 
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // const { email, password } = user;
    try {
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });
      console.log(res)
      if (res.status === 200) {

        const { token, user } = await res.json();

        localStorage.setItem("token", token);
        document.cookie = `jwt=${token}; max-age=86400*100; path=/`;
        localStorage.setItem("id", user._id);

       console.log(user._id)

        localStorage.setItem("role", user.role);
          if(user.role==="condidat")
          {
            history.push("/profile-page");
            toast.success("Bienvenue !");

            // setShowAlert(true);
            // setAlertMessage("Welcome to your Profile!");
          }

          else if(user.role==="formateur")
          {
            history.push("/profile-formateur-page");
            toast.success("Bienvenue !");

          //   setShowAlert(true);
          // setAlertMessage("Welcome to your Profile!");
          }
          else if(user.role==="company") 
          {
            history.push("/profile-company-page");
            toast.success("Bienvenue !");

          //   setShowAlert(true);
          // setAlertMessage("Welcome to your Company's Profile!");
          }
          else if(user.role==="admin")
          {
            document.getElementById('admin-redirect').setAttribute("href","http://localhost:3001/admin/get-sesstion?token="+token)
            document.getElementById('admin-redirect').click();  
          
          }

      } 
      else if (res.status === 400) {
        toast.error("Error!")
        const data = await res.json();
        console.log(data.errors);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ResgisterNavBar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login1.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">SignIn</h3>
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

               {/* form */}
                <Form onSubmit={handleSubmit} className="register-form">
                  <div>


                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    // hedhy badelt'ha type te3ha mail
                    type="email"
                    // {...register("email", {
                    //   required: true,
                    //   pattern: /^\S+@\S+$/i,
                    // })}
                    name="email"
                    value={email}
                     onChange={e => setEmail(e.target.value)}
                    //  onChange={handleChange}
                  />
                    {errors.email && <span>{errors.email}</span>}
                  </div>
                  <div>
                  <label>Password</label>

                  <Input
                    placeholder="Password"
                    type="password"
                   // {...register("password", { required: true })}
                    name="password"
                    value={password}
                     onChange={e => setPassword(e.target.value)}

                    //  onChange={handleChange}
                  />
                    {errors.password && <span>{errors.password}</span>}
                  </div>
                  <Button  block className="btn-round" color="danger" type="submit">
                    Login
                  </Button>
                  {showAlert && (
        <Alert color="success">{alertMessage}</Alert>
      )}
                </Form>



                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    // onClick={(e) => e.preventDefault()}
                    onClick={() => history.push("/new-passwordEmail")}
                  >
                    Forgot password?
                  </Button>
                 
                  <a href="" id="admin-redirect" style={{display: "none"}}></a>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>

        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by InternFlow
          </h6>
        </div>
      </div>
      <ToastContainer />

    </>
  );
}

export default Login;
