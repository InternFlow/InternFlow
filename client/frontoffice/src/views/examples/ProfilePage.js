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
  const history = useHistory();


  const userStorage = JSON.parse(localStorage.getItem("user"));

  console.log("localhost : ",localStorage.getItem("user"))
  console.log("userStorage : ",userStorage)

  const handleLogOut = async (event) => {
    try {
      const res = await fetch('http://127.0.0.1:3000/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
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
                {userStorage.name} <br />
              </h4>
              <h6 className="description">Role of user : {userStorage.role}</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <br />
              <Button className="btn-round" color="default" outline>
                <i className="fa fa-cog" /> Settings
              </Button>
              <Button className="btn-round" color="default" outline onClick={ handleLogOut }>
                <i className="fa fa-cog" /> LogOut
              </Button>
            </Col>
          </Row>
          <br/>
          {/* Tab panes */}
          
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}


export default ProfilePage;