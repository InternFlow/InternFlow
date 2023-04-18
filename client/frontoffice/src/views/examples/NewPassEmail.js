import React, { useState } from "react";
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
  Row,Container,
  Col,
  Alert,
} from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoginNavbar from "components/Navbars/LoginNavBar";

function NewPassEmail() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("Forgot Password");
  const history = useHistory();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/email/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      setError("");
      setShowForm(true);
      setButtonText("Reset Password");
      setEmail(email); // Ajout de cette ligne
    } catch (error) {
      setError(error.response.data.errorMessage);
      setMessage("");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/email/reset-password",
        { email, otp, password }
      );
      setMessage(response.data.message);
      setError("");
      history.push("/signin");
    } catch (error) {
      setError(error.response.data.errorMessage);
      setMessage("");
    }
  };

  const cardStyles = {
    width: '40%',
    margin: 'auto',
    padding: '1rem',
    margin: 'auto'
  };



  return (

    <>
    <LoginNavbar />
    <div
      className="page-header"
      style={{
        backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
      }}
    >
      <div className="filter" />
      <Container>
      <Row>
        <Col md="12">
          <Card className="card-register" style={cardStyles}>
            <CardHeader>
              <CardTitle tag="h5">Reset Password</CardTitle>
            </CardHeader>
            <CardBody>
              {message && (
                <Alert color="success" className="text-center">
                  {message}
                </Alert>
              )}
              {error && (
                <Alert color="danger" className="text-center">
                  {error}
                </Alert>
              )}
              <Form onSubmit={showForm ? handleResetPassword : handleForgotPassword}>
                <FormGroup>
                  <label>Email address</label>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={showForm} // Ajout de cette ligne
                  />
                </FormGroup>
                {showForm && (
                  <>
                    <FormGroup>
                      <label>OTP code</label>
                      <Input
                        type="text"
                        placeholder="Enter OTP code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>New Password</label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                  </>
                )}
                <Button  type="submit"  color="danger" block>
                  {buttonText}
                </Button>
              </Form>
            </CardBody>
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

export default NewPassEmail;
