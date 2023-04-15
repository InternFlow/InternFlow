
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
import { useHistory, useParams } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import { API } from "config";
import OfferHeader from "components/Headers/OfferHeader";

function OfferList() {
  const id = localStorage.getItem("id");
  // const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL

  const [offers, setOffers] = useState([]);



  async function getOffers(){
    fetch(`${API}/Offer/getOffers`, {
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => setOffers(data));
 }

  useEffect(()=>{getOffers()},[]);

  console.log(offers.id);


  
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
          
            <Col md="9">
              <Row>
              {offers.map((offer) => (
                <Col md="4" key={offer.id}>
                <Card className="mb-4"  key={offer.id}>
                  <CardBody>
                    <CardTitle tag="h5">{offer.title}</CardTitle>
                    <p>{offer.description}</p>
                    <Button color="primary" onClick={() => history.push(`/DetailsOffers/${offer._id}`)}>
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
