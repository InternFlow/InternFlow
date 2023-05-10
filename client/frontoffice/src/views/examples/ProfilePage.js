import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardGroup,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from "components/Accordion";
import CondidatNavbar from "components/Navbars/CondidatNavbar";

function ProfilePage(props) {
  const id = props.userId;

  const history = useHistory();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [userd, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    occupation: "",
    pfpPath:
      "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",
    educations: [
      {
        schoolName: "",
        degree: "",
        description: "",
      },
    ],
    experiences: [
      {
        jobTitle: "",
        company: "",
        description: "",
      },
    ],
    skills: [],
    local: [],
    description: "",
  });

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  if (!token) {
    history.push("/sign-in");
  }
  const goedit = async (event) => {
    //history.push('/Edit-condidat-page');

    history.push(`/Edit-condidat-page`);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/profile/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const userData = data.user;
          setUserData(userData);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <>
      <CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={userd.pfpPath}
              />
            </div>
            <Row>
              <Col md="4">
                <Card className="text-center text-md-left">
                  <CardHeader>
                    <CardTitle
                      tag="h5"
                      style={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      {userd.name} {userd.lastName}
                    </CardTitle>
                    {userd.occupation}
                  </CardHeader>
                  <CardBody>
                    <ListGroup flush>
                      <ListGroupItem className="justify-content-between">
                        Skills :
                        <h6 className="description">
                          {userd.skills.join(", ")}
                        </h6>
                      </ListGroupItem>
                      <ListGroupItem className="justify-content-between">
                        Contact :<h6 className="description">{userd.email} </h6>
                      </ListGroupItem>
                      <ListGroupItem className="justify-content-between">
                        Residence :
                        <h6 className="description">{userd.local[0]} </h6>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col md="8">
                <Card className="text-center text-md-left">
                  <CardHeader>About:</CardHeader>
                  <CardBody style={{ padding: "18p" }}>
                    <h5 className="text-uppercase">Bio:</h5>
                    <p>{userd.description}</p>

                    {userd.experiences && userd.experiences.length !== 0 && (
                      <Accordion title={"Work experience"}>
                        {userd.experiences.map((experience, index) => (
                          <Row key={index} style={{ padding: "18px" }}>
                            <Col className="text-center text-md-left">
                              <h6 className="text-uppercase">
                                {experience.jobTitle}
                              </h6>
                              <p style={{ fontWeight: 500 }}>
                                Worked at: {experience.company}
                              </p>
                              <p>{experience.description}</p>
                            </Col>
                          </Row>
                        ))}
                      </Accordion>
                    )}
                    {userd.educations && userd.educations.length !== 0 && (
                      <Accordion title={"Education"}>
                        {userd.educations.map((education, index) => (
                          <Row key={index} style={{ padding: "18px" }}>
                            <Col className="text-center text-md-left">
                              <h6 className="text-uppercase">
                                {education.degree}
                              </h6>
                              <p style={{ fontWeight: 500 }}>
                                Studied at: {education.schoolName}
                              </p>
                              <p>{education.description}</p>
                            </Col>
                          </Row>
                        ))}
                      </Accordion>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
