import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components

import { useHistory } from "react-router-dom";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { Link, scroller } from "react-scroll";
import { useState } from 'react';

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const history = useHistory();
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  const roleToken = localStorage.getItem("role");

  const [notifications, setNotifications] = useState([]);
  const [numNotifications, setNumNotifications] = useState(0);
console.log(notifications);




  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
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
    if(!token){
      setRole("guest");
    }
    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const handleLogin = async (event) => {
    history.push("/sign-in");
  };

  const toCourses = async (event) => {
    history.push("/AllCourses");
  };
  const toOffers = async (event) => {
    history.push("/Alloffers");
  };
  const toEvents = async (event) => {
    history.push("/Events");
  };
  const toProfil = async (event) => {
    history.push("/Profile");
  };

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container className="m-0">
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            onClick={() => {
              history.push("./index");
            }}
            target="_blank"
            style={{ cursor: "pointer" }}
          >
            <Link to="mainheader" smooth={true} duration={200}>
              <b> InternFlow</b>
            </Link>
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
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



          <NavItem style={{ cursor: "pointer" }}>
              <NavLink>
                <Link to="Project" smooth={true} duration={200} offset={-120}>
                  <b>What is InternFlow</b>
                </Link>
              </NavLink>
            </NavItem>

            <NavItem style={{ cursor: "pointer" }}>
              <NavLink>
                <Link to="Team" smooth={true} duration={200} offset={-100}>
                  <b>Team</b>
                </Link>
              </NavLink>
            </NavItem>

          {role!="guest" && (

<NavItem>
<Button style={{color:"black"}}
    
    outline onClick={toEvents}
  >
     Events
  </Button>
</NavItem>
)}

            {roleToken=="condidat" &&(

            <NavItem>
            <Button
                
                outline onClick={toCourses}
              >
                <i className="nc-icon nc-spaceship"></i> All Courses
              </Button>
            </NavItem>
            )}

  {/*          
{roleToken=="condidat" &&(

<NavItem>
<Button
    
    outline onClick={toOffers}
  >
     All Offers
  </Button>
</NavItem>
)} */}

            {roleToken=="condidat" &&(

<NavItem>
<Button
    
    outline onClick={toCourses}
  >
     My Courses
  </Button>
</NavItem>
)}
                    <NavItem style={{ cursor: "pointer" }}>
              <NavLink>
                <Link to="contactUs" smooth={true} duration={200}>
                  <b>Contact Us</b>
                </Link>
              </NavLink>
            </NavItem>
    
            {role=="guest" && (

            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                target="_blank"
                outline
                onClick={handleLogin}
              >
                login
              </Button>
            </NavItem>
            )}

{roleToken =="condidat" && (

<NavItem>
<Button
    className="btn-round"
    color="primary"
    target="_blank"
    outline
     onClick={toOffers}
  >
    <i className="nc-icon nc-spaceship"></i> All Offers
  </Button>
</NavItem>
)}

{role!="guest" && (

<NavItem>
<Button
    className="btn-round"
    color="primary"
    target="_blank"
    outline
     onClick={toProfil}
  >
    <i className="nc-icon nc-spaceship"></i> My Profil
  </Button>
</NavItem>
)}
            
    {role!="guest" && (


<NavItem>
<Button
    className="btn-round"
    color="danger"
    target="_blank"
    outline onClick={handleLogOut}
  >
     LogOut
  </Button>
</NavItem>
)}

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;