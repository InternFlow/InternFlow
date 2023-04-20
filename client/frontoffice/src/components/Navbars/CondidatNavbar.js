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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'reactstrap';
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,Modal, ModalHeader, ModalBody,
  Container,
  Button
} from "reactstrap";
import { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
function CondidatNavbar() {
  
    
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  if (!token) {

    history.push('/sign-in');

  }  
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
    fetchNotifications();
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
        window.alert("logout")
        localStorage.clear();
        history.push('/');
      }


    } catch (error) {
      console.log(error);
    }
  }




  return (
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
            <NavItem>
              <NavLink to="/index" tag={Link}>
                <i className="nc-icon nc-layout-11" /> Components
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-examples-navbar"
                target="_blank"
              >
                <i className="nc-icon nc-book-bookmark" /> Documentation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim?ref=creativetim"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim?ref=creativetim"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.github.com/CreativeTimOfficial?ref=creativetim"
                target="_blank"
                title="Star on GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem>




            <NavItem>
            <NavLink  onClick={toggle}>
        <i className="fa fa-bell" />
        <Badge pill color="danger">
             {numNotifications}

        </Badge>
        <span className="d-md-none ml-1">Notifications</span>
      </NavLink>
      </NavItem>
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
            <Link to={`/quizzes/offres/condidat/${notification.offreid}`} className="btn btn-primary ml-3">passer quizzes</Link>
          ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune notification</p>
        )}
      </ModalBody>
    </Modal>



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
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default CondidatNavbar;