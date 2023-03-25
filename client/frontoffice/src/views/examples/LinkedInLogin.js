import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from 'axios';

// core components
import ResgisterNavBar from "components/Navbars/RegisterNavbar";
const LinkedInLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState('condidat');
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const history = useHistory();

  const handleLinkedInLogin = () => {
    setIsLoading(true);

    fetch("http://localhost:5000/linkedIn/auth")
      .then((response) => response.json())
      .then((data) => {
        window.open(data.url, "_blank");
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    console.log(params.token);

    if (params.linkedinId && params.name && params.email && params.role && params.Id) {
      setUserData({

        linkedinId: params.linkedinId,
        name: params.name,
        email: params.email,
        role: params.role,
        id: params.Id
      }

      );
      console.log(userData);

    }
console.log(params);
    setToken(params.token)
    localStorage.setItem("token", params.token);
    localStorage.setItem("id", params.Id);
    localStorage.setItem("role", params.role);

  }, []);

  useEffect(() => {
    if (userData && userData.role === "new") {
      setSelectedRole('condidat');
    }
  }, [userData]);

  const handleRoleSelect = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRoleSubmit = () => {
    fetch(`http://localhost:5000/linkedIn/update/${userData.linkedinId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ role: selectedRole })
    })
      .then(() => {
        console.log(userData._id)
        setUserData(prevUserData => ({
          ...prevUserData,
          role: selectedRole
        }));
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  if (!userData) {
    return (
      <>
        <ResgisterNavBar />
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
                  <h3 className="title mx-auto">Login with LinkedIn</h3>
                  <div className="social-line text-center">


                  <Button  block className="btn btn-primary" color="danger" onClick={handleLinkedInLogin} disabled={isLoading} type="submit">
                  {isLoading ? "Loading..." : "Login"}
                  </Button>


                  </div>
                  <Button
                    className="btn-neutral btn-just-icon "
                    color="linkedin"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-linkedin fa-2x" />
                  </Button>

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

  switch (userData.role) {
    case "new":
      return (
        <>
          <ResgisterNavBar />
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
                    <h3 className="title mx-auto">Please select a role:</h3>
                    <div className="social-line text-center">
              <div className="form-group">
                <select className="form-control" value={selectedRole} onChange={handleRoleSelect}>
                  <option value="condidat">Candidate</option>
                  <option value="company">Company</option>
                  <option value="formateur">Trainer</option>
                </select>
              </div>
                    </div>
                    <Button  block className="btn-round" color="danger" onClick={handleRoleSubmit} type="submit">
                        Login
                      </Button>


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
    default:
      if(userData.role==="condidat")
      {
        history.push("/profile-page");

      }
      else if(userData.role==="formateur")
      {
        history.push("/profile-formateur-page");

      }
      else if(userData.role==="company")
      {
        history.push("/profile-company-page");

      }else if(userData.role==="condidat")
      {
        history.push("/profile-page");

      }else if(userData==="admin")
      {
        window.location.replace('http://localhost:3001/admin/dashboard');

      }
  }
};

export default LinkedInLogin;
