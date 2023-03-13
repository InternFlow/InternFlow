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
import signin from "../assets/img/signin.jpg";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/email/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };const cardStyles = {
    width: '280%',
    margin: 'auto',
    padding: '1rem',
    margin: 'auto'
  };


  return (
    <>
      <div className="content"
        style={{
            backgroundImage: `url(${signin})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "100vh",
            position: "relative"
          }}
      >

        <div className="content d-flex justify-content-center align-items-center" >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Row>

          <Col md="12">
            <Card className="card-user" style={cardStyles}>
              <CardHeader>
                <CardTitle tag="h5">forgot password</CardTitle>
              </CardHeader>
              <CardBody
              >
                      {/* <div style={{ backgroundColor: "white", padding: "2rem" }}> */}

                <Form onSubmit={handleSubmit}>

                  <Row>

                    <Col className="pl-1" md="8">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>

                                <Input
                          defaultValue="michael23"
                          placeholder="Name..."
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />

                      </FormGroup>
                      {message && <p>{message}</p>}

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
                        color="secondary"
                        type="submit"
                      >
                        Forgot Password?
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

export default ForgotPassword;
