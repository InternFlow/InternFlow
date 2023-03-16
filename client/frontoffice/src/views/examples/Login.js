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
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios"

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { useHistory } from "react-router-dom";

function Login() {
  // document.documentElement.classList.remove("nav-open");
  // React.useEffect(() => {
  //   document.body.classList.add("register-page");
  //   return function cleanup() {
  //     document.body.classList.remove("register-page");
  //   };
  // });

  // const { register, handleSubmit, formState: { errors } } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  // Handle Login
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  // const [user, setUser] = useState({
  //   email: '',
  //   password: ''
  // });

  // Handle Input
  // const handleChange = (event) => {
  //   let name = event.target.name
  //   let value = event.target.value

  //   setUser({ ...user, [name]: value })
  // }



  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate the form fields
    let errors = {};
    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // const { email, password } = user;
    try {
      axios
    .post('http://127.0.0.1:3000/login', {
      email, password
    })
    .then((response) => {
      console.log("response data signin : ",response.data)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.alert("Login Successfull");
        history.push('/profile-page');
      } else if(response.status === 400 || !response){
        window.alert("Invalid Credentials")
      }

      return response.data;
    });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
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
                </Form>

                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    // onClick={(e) => e.preventDefault()}
                    onClick={() => history.push("/sign-up")}
                  >
                    Sign Up
                  </Button>
                </div>

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
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </>
  );
}

export default Login;
