import React from "react";
// import "./Project.css";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

function Projectintro() {
  return (
    <div id="Project">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="title">What is Internflow?</h2>
            <br />

            <h5 className="description">
             <strong>
             Internflow is an innovative internship website that is dedicated
              to connecting students and recent graduates with top-notch
              internship opportunities in various industries. The platform is
              designed to make the internship application process easy,
              efficient, and stress-free.
             </strong>
            </h5>
            <br />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col md="4">
            <div className="info">
              <div className="icon icon-info">
                <i className="nc-icon nc-bulb-63" />
              </div>
              <div className="description">
                <h4 className="info-title"> User-friendly interface</h4>
                <br />
                <p className="description">
                 <strong>
                 The website is easy to navigate, and students can quickly find
                  internships that match their skills, interests, and
                  experience.
                 </strong>
                </p>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="info">
              <div className="icon icon-info">
                <i className="nc-icon nc-bulb-63" />
              </div>
              <div className="description">
                <h4 className="info-title">New Ideas</h4>
                <br />
                <p>
                  <strong>
                  Internflow also offers a range of resources and tools to help
                  users prepare for their internship applications
                  </strong>
                </p>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="info">
              <div className="icon icon-info">
                <i className="nc-icon nc-bulb-63" />
              </div>
              <div className="description">
                <h4 className="info-title">Application management system</h4>
                <br />
                <p>
                 <strong>
                 which allows users to track the status of their applications,
                  and manage their communications with potential employers all
                  in one place
                 </strong>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Projectintro;