import React from "react";
import "./Project.css";
import "./Team.css";


// reactstrap components
import {
  // Button,
  Card,
  CardBody,
  // CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

function Teamintro() {
  return (
    <div id="Team">
      <Container>
        <h2 className="title">Meet the team</h2>
        <Row>
          <Col md="4">
            <Card className="card-profile card-plain">
              <div className="card-avatar">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." src={require("assets/img/faces/Photo.png")} />
                </a>
              </div>
              <CardBody>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <div className="author">
                    <CardTitle tag="h4">Mohamed Ali Fradj</CardTitle>
                    <h6 className="card-category">Developer</h6>
                  </div>
                </a>
                {/* <p className="card-description text-center">
                  Teamwork is so important that it is virtually impossible for
                  you to reach the heights of your capabilities or make the
                  money that you want without becoming very good at it.
                </p> */}
          <p className="card-description text-center quote">
  Teamwork is so important that it is virtually impossible for you to reach
  the heights of your capabilities or make the money that you want without
  becoming very good at it.
</p>


              </CardBody>
            
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-profile card-plain">
              <div className="card-avatar">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." src={require("assets/img/faces/Photo2.png")} />
                </a>
              </div>
              <CardBody>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <div className="author">
                    <CardTitle tag="h4">Seifallah Yeferni</CardTitle>
                    <h6 className="card-category">Developer</h6>
                  </div>
                </a>
                <p className="card-description text-center quote">
                  A group becomes a team when each member is sure enough of
                  himself and his contribution to praise the skill of the
                  others. No one can whistle a symphony. It takes an orchestra
                  to play it.
                </p>
              </CardBody>
           
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-profile card-plain">
              <div className="card-avatar">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." src={require("assets/img/faces/Photo3.png")} />
                </a>
              </div>
              <CardBody>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <div className="author">
                    <CardTitle tag="h4">Zeineb Harakati</CardTitle>
                    <h6 className="card-category">Developer</h6>
                  </div>
                </a>
                <p className="card-description text-center quote">
                  The strength of the team is each individual member. The
                  strength of each member is the team. If you can laugh
                  together, you can work together, silence isn’t golden, it’s
                  deadly.
                </p>
              </CardBody>
            
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="card-profile card-plain">
              <div className="card-avatar">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." src={require("assets/img/faces/Photo5.png")} />
                </a>
              </div>
              <CardBody>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <div className="author">
                    <CardTitle tag="h4">Ahmed Nafti</CardTitle>
                    <h6 className="card-category">Developer</h6>
                  </div>
                </a>
                <p className="card-description text-center quote">
                  Alone we can do so little; together we can do so much.
                </p>
              </CardBody>
             
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-profile card-plain">
              <div className="card-avatar">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." src={require("assets/img/faces/Photo4.png")} />
                </a>
              </div>
              <CardBody>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <div className="author">
                    <CardTitle tag="h4">Mohamed Charfedine Ouhibi</CardTitle>
                    <h6 className="card-category">Developer</h6>
                  </div>
                </a>
                <p className="card-description text-center quote">
                  Coming together is a beginning, staying together is progress,
                  and working together is success
                </p>
              </CardBody>
          
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Teamintro;