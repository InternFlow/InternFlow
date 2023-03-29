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
import React, { useState, useEffect } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCheckCircle,faCompany, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {faBuilding,faUserTie,faSchool,faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from "react-router-dom";


import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container , Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

function ResgisterNavbar() {

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
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const history = useHistory();

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

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



  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const handleLogin = async (event) => {

        history.push('/sign-up');



  }
  return (

<>

    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="Coded by Creative Tim"
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
                href="https://www.github.com/CreativeTimOfficial/paper-kit-react?ref=creativetim"
                target="_blank"
                title="Star on GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-index-navbar"
                target="_blank"
              >
                <i className="nc-icon nc-book-bookmark" /> Documentation
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                target="_blank"
                outline
                 onClick={toggle}
              >
                <i className="nc-icon nc-spaceship"></i> Register
              </Button>


            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>

    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>ARE YOU A :</ModalHeader>
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

export default ResgisterNavbar;
