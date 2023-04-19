
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
  Button,
  CardImg
} from "reactstrap";
import offerImage from "../uploads/offers/1681389235310-offers.jpg";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import { API } from "config";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import OfferHeader from "components/Headers/OfferHeader";

function ListCAndidiesOffer() {
  // const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL
  const { id } = useParams();

console.log(id);
  const [candidacies, setCandidacies] = useState([]);
console.log(candidacies);


  async function getListCandidaciesOffer(){
    fetch(`${API}/Candidacy/getListCandidaciesOffer/${id}`, {
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => setCandidacies(data));
 }

  useEffect(()=>{
    console.log("wa");
    getListCandidaciesOffer()},[]);



  
  const r = (idP) => {

   history.push(`/showApply?param=${idP}`);

  }
  
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
    <ExamplesNavbar/>
      <OfferHeader />

      <div className="section profile-content" >
        <br></br>
        <Container>
          <div className="owner">
           
          <Row >
          
            <Col md="9">
              <Row>
             {candidacies.map((candidacy) => (
                <Col md="4" key={candidacy._id}>
                <Card className="mb-4"  key={candidacy._id}>
                <CardImg top width="100%" src={offerImage} alt="Offer Image" />

                  <CardBody>
                    <CardTitle tag="h5">{candidacy.description}</CardTitle>
                    {new Date(candidacy.dateApply).toLocaleDateString()}
                    <p>{candidacy.description}</p>
                    <Button color="primary" onClick={() => history.push(`/ApplyPageOffer/${candidacy._id}`)}>
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


export default ListCAndidiesOffer;