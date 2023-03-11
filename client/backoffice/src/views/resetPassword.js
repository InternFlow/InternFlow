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
import forgotPassword from "../assets/img/forgotPassword.jpg";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";




function ResetPassword() {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

 
  //FormData
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = window.location.pathname.split("/")[2];
    const formData = new FormData();
    formData.append("password", password);

    try {
        const response = await fetch(`${API}/email/reset-password/${token}`, {
            method: "POST",
            body: formData,
        }); 

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
        } else {
            setMessage(data.errorMessage);
        }

    } catch (error) {
        console.error(error);
        setMessage("Server error");
    }
  };
  
 

 
 
  
  const cardStyles = {
    width: '180%',
    margin: 'auto',
    padding: '1rem',
    margin: 'auto'
  };

  

  return (
    <>
      <div className="content"
        style={{
            backgroundImage: `url(${forgotPassword})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "90vh",
            position: "relative"
          }}
      >

        <div className="content d-flex justify-content-center align-items-center" >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Row>
         
          <Col md="12">
            <Card className="card-user" style={cardStyles}>
              <CardHeader>
                <CardTitle tag="h5">Reset Password</CardTitle>
              </CardHeader>
              <CardBody 
              >

                <Form onSubmit={handleSubmit}>
                 
                  <Row>
                   
                    <Col className="pl-1" md="8">
                      {/* <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" 
                          value={formData.email}
                          onChange= {(e)=> setFormData({ ...formData, email: e.target.value})
                          }
                        />
                      </FormGroup> */}
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
                        <label htmlFor="password">New Password</label>
                        <Input
                          // defaultValue="michael23"
                          placeholder="New Password..."
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)} 
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      
                    </Col>
                    
                   
                  </Row>
                  
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Reset Password
                      </Button>
                      {/* {message && <p>{message}</p>} */}
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

export default ResetPassword;
