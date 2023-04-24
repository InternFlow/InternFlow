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
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCheckCircle,faCompany, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {faBuilding,faUserTie,faSchool,faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,Modal, ModalHeader, ModalBody,
  Container,
  Button, ModalFooter
} from "reactstrap";
import { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
function CondidatNavbar() {
  const [role, setRole] = useState("");

  console.log(role);

    
  const history = useHistory();
  const token = localStorage.getItem("token");
  const roleToken = localStorage.getItem("role");
console.log(roleToken)
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
/*
  if (!token) {

    history.push('/sign-in');

  }  */
  const [modal, setModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [numNotifications, setNumNotifications] = useState(0);

  const toggle = async () => {
    setModal(!modal);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch('http://localhost:5000/Candidacy/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setNotifications(data);
        } else {
          throw new Error(`Error fetching notifications. Status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    
  };


  const handlegoTomesStages = async (event) => {
    try {

        

        history.push('/stagescompany');
      


    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch('http://localhost:5000/Candidacy/notifications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setNumNotifications(data.length);
            } else {
                throw new Error(`Error fetching notifications. Status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }
    };
if(!token){
setRole("guest");
}
else{
   fetchNotifications();
}
   
}, []);


  React.useEffect(() => {

    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });


  const handleLogOut = async (event) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.clear();
        history.push('/');
      }


    } catch (error) {
      console.log(error);
    }
  }

  const handleOption1Click = () => {
    history.push('/sign-up');
    toggle();
  }

  const handleOption2Click = () => {
    history.push('/sign-up-Trainer');
    toggle();
  }

  const handleOption3Click = () => {
    history.push('/sign-up-Company');
    toggle();
  }

  const handleLogin = async (event) => {

    history.push('/sign-in');

}


const [modal2, setModal2] = useState(false);

const toggle2 = () => setModal2(!modal2);

  return (
    <>
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/index"
            target="_blank"
            title="Coded by Creative Tim"
            tag={Link}
          >
            InternFlow
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
          {roleToken=="condidat" &&(

<NavItem>
  <NavLink to="/AllCourses" tag={Link}>
    <i className="nc-icon nc-layout-11" /> All courses
  </NavLink>
</NavItem>
)}
        {roleToken=="condidat" &&(

<NavItem>
  <NavLink to="/CondidatInterview" tag={Link}>
    <i className="nc-icon nc-layout-11" /> My interviews
  </NavLink>
</NavItem>
)}

          {roleToken=="condidat" &&(

<NavItem>
  <NavLink to="/ListCandidaciesIntern" tag={Link}>
    <i className="nc-icon nc-layout-11" /> My Courses
  </NavLink>
</NavItem>
)}
          {roleToken=="condidat" &&(

            <NavItem>
              <NavLink to="/ListCandidaciesIntern" tag={Link}>
                <i className="nc-icon nc-layout-11" /> My Applies
              </NavLink>
            </NavItem>
          )}
          
          {roleToken=="condidat" &&(

<NavItem>
  <NavLink to="/Alloffers" tag={Link}>
    <i className="nc-icon nc-layout-11" /> All Offers
  </NavLink>
</NavItem>
)}
            {roleToken=="company" &&(
           <NavItem>
           <NavLink to="/stagescompany" tag={Link}>
             <i className="nc-icon nc-layout-11" /> My Offers
           </NavLink>
         </NavItem>
            )}



            {roleToken==="condidat" && (

            <NavItem>
            <NavLink  onClick={toggle}>
        <i className="fa fa-bell" />
        <Badge pill color="danger">
             {numNotifications}

        </Badge>
        <span className="d-md-none ml-1">Notifications</span>
      </NavLink>
      </NavItem>

            )}



      <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <FontAwesomeIcon icon={faTimes} className="mr-2" />
        Notifications
      </ModalHeader>
      <ModalBody>
        {notifications.length ? (
          <ul className="list-group">
            {notifications.map((notification) => (
              <li key={notification.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="notification-message">{notification.message}</div>
                  {notification.link ? (

<Link to={`/quizzes/offres/condidat?ido=${notification.offreid}`} className="btn btn-primary ml-3">passer quizzes</Link>          ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune notification</p>
        )}
      </ModalBody>
    </Modal>

    {role!="guest" && (


            <NavItem>
            <Button
                className="btn-round"
                color="danger"
                target="_blank"
                outline onClick={handleLogOut}
              >
                <i className="nc-icon nc-spaceship"></i> LogOut
              </Button>
            </NavItem>
    )}
            {role=="guest" && (

            <NavItem>
 <Button
                className="btn-round"
                color="danger"
                target="_blank"
                outline
                 onClick={toggle2}
              >
                <i className="nc-icon nc-spaceship"></i> Register
              </Button>
            </NavItem>
            )}
            {role=="guest" && (

            <NavItem>
            <Button
                className="btn-round"
                color="danger"
                target="_blank"
                outline
                 onClick={handleLogin}
              >
                <i className="nc-icon nc-spaceship"></i> Login
              </Button>
            </NavItem>
            )}
    
             </Nav>
        </Collapse>
      </Container>
    </Navbar>
    <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>ARE YOU A :</ModalHeader>
        <ModalBody style={{ paddingLeft: '20px', width: '600px' }}>
        <Button color="danger" className="mb-2 mr-3" onClick={handleOption1Click}>
          <FontAwesomeIcon icon={faUserTie} size="6x" className="mr-2"  />
          <div>I'am a intern</div>
          </Button>

          <Button color="danger" className="mb-2 mr-3" onClick={handleOption2Click}>
          <FontAwesomeIcon icon={faSchool} size="6x" className="mr-2"  />
          <div>I'am a Trainer</div>

          </Button>

                    <Button color="danger" className="mb-2" onClick={handleOption3Click}>
          <FontAwesomeIcon icon={faBuilding} size="6x" className="mr-2"  />
          <div>I'am a Company</div>

          </Button>

           </ModalBody>
        <ModalFooter>
          <Button  color="secondary" onClick={toggle}>Fermer</Button>
        </ModalFooter>
      </Modal>

    </>
  );
}

export default CondidatNavbar;