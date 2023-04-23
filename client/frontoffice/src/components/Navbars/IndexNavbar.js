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

function IndexNavbar() {
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

  const handleLogin = async (event) => {
    history.push("/sign-in");
  };
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
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
                <Link to="contactUs" smooth={true} duration={200}>
                  <b>Contact Us</b>
                </Link>
              </NavLink>
            </NavItem>

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
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
