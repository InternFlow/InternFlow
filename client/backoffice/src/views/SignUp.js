/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { API } from "../config";
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import signup from "../assets/img/signup.jpg";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successmessage, setsuccessmessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  /*
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };*/
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      console.log(res.data);

      //   setErrors({ successMessage: res.data.successMessage });
      alert(res.data.successMessage);

      history.push("/signin");
    } catch (err) {
      const { name, email, password } = err.response.data.errors;
      setNameError(name);
      setEmailError(email);
      setPasswordError(password);
    }
  };
  const cardStyles = {
    width: "250%",
    margin: "auto",
    padding: "1rem",
    margin: "auto",
  };

  return (
    <>
      <div
        className="content"
        style={{
          backgroundImage: `url(${signup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        {/* <img alt="bg signup" src={require("assets/img/signup.jpg")} height="500px" /> */}

        <div className="content d-flex justify-content-center align-items-center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Row>
              <Col md="12">
                <Card className="card-user" style={cardStyles}>
                  <CardHeader>
                    <CardTitle tag="h5">SignUp</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {/* <div style={{ backgroundColor: "white", padding: "2rem" }}> */}

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col className="px-1" md="8">
                          <FormGroup>
                            <label>Name</label>
                            <Input
                              placeholder="Name..."
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }

                              required
                            />
                            {nameError && (
                              <p className="text-danger">{nameError}</p>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-1" md="8">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Input
                              placeholder="Email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }

                              required
                            />

                            {emailError && (
                              <p className="text-danger">{emailError}</p>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pr-1" md="8">
                          <FormGroup>
                            {/* <label>Address</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        /> */}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-1" md="8">
                          <FormGroup>
                            <label>Password</label>
                            <Input
                              // defaultValue="michael23"
                              placeholder="Password..."
                              type="password"
                              value={formData.password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                })
                              }

                              required
                            />
                            {passwordError && (
                              <p className="text-danger">{passwordError}</p>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4"></Col>
                      </Row>

                      <Row>

                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                          >
                            SignUp
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
