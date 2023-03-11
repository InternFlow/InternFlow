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
  Col
} from "reactstrap";
import signup from "../assets/img/signup.jpg";
import { useHistory } from "react-router-dom";
import axios from "axios";




function SignUp() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  //FormData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({ name,email, password })
      body: JSON.stringify(formData)

      });

      const { token } = await response.json();
      localStorage.setItem("token", token);
      history.push("/admin/dashboard");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  
    // fetch(`${API}/register`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //     history.push("/admin/dashboard");

    //   })
    //   // .then((data) => {
    //   //   console.log(data);
    //   //   // do something with the response data
    //   // })
    //   .catch((error) => {
    //     console.error("There was a problem with the fetch operation:", error);
    //   });
  };
  
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(`${API}/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ name,email, password })
  //     });
  //     const { token } = await response.json();
  //     localStorage.setItem("token", token);
  //     history.push("/dashboard"); // Naviguer vers la page de dashboard
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  const cardStyles = {
    width: '280%',
    margin: 'auto',
    padding: '1rem',
    margin: 'auto'
  };

  

  return (
    <>
      <div className="content"
        style={{
            backgroundImage: `url(${signup})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "100vh",
            position: "relative"
          }}
      >
        {/* <img alt="bg signup" src={require("assets/img/signup.jpg")} height="500px" /> */}

        <div className="content d-flex justify-content-center align-items-center" >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Row>
         
          <Col md="12">
            <Card className="card-user" style={cardStyles}>
              <CardHeader>
                <CardTitle tag="h5">SignUp</CardTitle>
              </CardHeader>
              <CardBody 
              >
                      {/* <div style={{ backgroundColor: "white", padding: "2rem" }}> */}

                <Form onSubmit={handleSubmit}>
                  <Row>
                  <Col className="px-1" md="8">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Name..."
                          type="text"
                          value={formData.name}
                          onChange= {(e)=> setFormData({ ...formData, name: e.target.value})
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col> */}
                    <Col className="pl-1" md="8">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" 
                          value={formData.email}
                          onChange= {(e)=> setFormData({ ...formData, email: e.target.value})
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Chet"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Faker"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
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
                          onChange= {(e)=> setFormData({...formData, password: e.target.value})
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      {/* <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup> */}
                    </Col>
                    {/* <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Australia"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col> */}
                    {/* <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col> */}
                  </Row>
                  {/* <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          type="textarea"
                          defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
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
