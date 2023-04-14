
import React ,{useEffect, useState} from "react";
// reactstrap components
import {
  Card, 
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardGroup,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import { API } from "config";
import OfferHeader from "components/Headers/OfferHeader";

function OfferList() {
  const id = localStorage.getItem("id");
  const [offers, setOffers] = useState([]);

  async function getOffers(){
    fetch(`${API}/Offer/getOffers`, {
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => setOffers(data));
 }

  useEffect(()=>{getOffers()},[]);



  
  const history = useHistory();




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
      <OfferHeader />
      <div className="section profile-content" >
        <br></br>
        <Container>
          <div className="owner">
           
          <Row >
            {/* <Col md="3" >
              <Card className="text-center text-md-left">
                <CardHeader>
                <CardTitle tag="h5" style={{ fontWeight: "bold", fontSize: 22 }}>
                    Filter
                </CardTitle>
                </CardHeader>
                <CardBody></CardBody>
              </Card >
            </Col> */}
            <Col md="9">
              <Row>
              {offers.map((offer) => (
                <Col md="4" key={offer.id}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle tag="h5">{offer.title}</CardTitle>
                    <p>{offer.description}</p>
                    <Button color="primary" onClick={() => history.push(`/DetailsOffers/${offer.id}`)}>
                      View Details
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              ))}  
              </Row>   
             
            
            </Col>
          </Row>

         

           </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}


export default OfferList;
