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
import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory } from "react-router-dom";

function ProfilePage() {
  const id = localStorage.getItem("id");

  const [userd, setUserData] = React.useState({experiences:[],educations:[],skills:[]});

  const history = useHistory();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

console.log(role)

  const handleLogOut = async (event) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
        ,credentials: 'include'
      });

      if (res.status === 200) {
        window.alert("logout")
        localStorage.clear();
        history.push('/');
      }


    } catch (error) {
      console.log(error);
    }
  }




  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });


  if (!token) {

    history.push('/sign-in');

  }
  const goedit = async (event) => {

    //history.push('/Edit-condidat-page');

    history.push(`/Edit-condidat-page`);


}




React.useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      ,credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        const userData = data.user;
        console.log(userData.experiences)
        setUserData(userData);
      })
      .catch(error => console.error(error));
  }
}, []);


  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/faces/joe-gardner-2.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
              {userd.name} {userd.lastName} <br />
              </h4>
              <h6 className="description">{userd.skills.join(', ')}</h6>
              <h5 className="description">{userd.email}</h5>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
               
              </p>
              <br />
              <Button className="btn-round" color="default" onClick={goedit} outline>
                <i className="fa fa-cog" /> Edit Profile
              </Button>

            </Col>
          </Row>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Experiences
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Educations
                  </NavLink>
                </NavItem>

              </Nav>
            </div>
          </div>
          {/* Tab panes */}
          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">


              <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <ul className="list-unstyled follows">
                  {userd.experiences.map((experience, index) => (

                    <li>
                      <Row>

                        <Col lg="7" md="4" xs="4">
                          <h6>
                            {experience.jobTitle}
                          </h6>
                        </Col>
                        <Col lg="7" md="4" xs="4">
                          <h6>
                            {experience.company}
                          </h6>
                        </Col>
                        <Col lg="7" md="4" xs="4">
                          <h6>
                            {experience.description}
                          </h6>
                        </Col>
                      </Row>
                      <hr />

                    </li>

                    ))}

                  </ul>
                </Col>
              </Row>
            </TabPane>




            <TabPane tabId="2" id="follows">
              <Row>
                <Col className="ml-auto mr-auto" md="6">
                <ul className="list-unstyled follows">
                  {userd.educations.map((education, index) => (

                    <li>
                      <Row>

                        <Col lg="7" md="4" xs="4">
                          <h6>
                            {education.schoolName}
                          </h6>
                        </Col>
                        <Col lg="7" md="4" xs="4">
                          <h6>
                            {education.degree}
                          </h6>
                        </Col>
                        <Col lg="7" md="4" xs="4">
                          <h6>
                            {education.fieldOfStudy}
                          </h6>
                        </Col>
                      </Row>
                      <hr />

                    </li>

                    ))}

                  </ul>
                </Col>
              </Row>
            </TabPane>








          </TabContent>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}


export default ProfilePage;
