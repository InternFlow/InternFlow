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

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button
} from "reactstrap";

function CompanyNavbar() {
  const history = useHistory();

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

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


  const handlegoTomesStages = async (event) => {
    try {

        

        history.push('/stagescompany');
      


    } catch (error) {
      console.log(error);
    }
  }

  const handlegoTomesStagesapplication = async (event) => {
    try {

        

        history.push('/stagescompanyapplication');
      


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
              <NavLink onClick={handlegoTomesStagesapplication}
                target="_blank">
                <i className="nc-icon nc-layout-11" /> Mes Applications
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                 onClick={handlegoTomesStages}
                target="_blank"
              >
                <i className="nc-icon nc-book-bookmark" /> Mes Stages 
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

export default CompanyNavbar;