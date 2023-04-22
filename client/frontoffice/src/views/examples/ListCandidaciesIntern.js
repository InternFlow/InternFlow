
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
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import { API } from "config";
import CondidatNavbar from "components/Navbars/CompanyNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";

function ListCAndidiesIntern() {
  const id = localStorage.getItem("id");
  // const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL

  const [candidacies, setCandidacies] = useState([]);
console.log(candidacies);


  async function getListCandidacyInter(){
    fetch(`${API}/Candidacy/getListCandidacyInter/${id}`, {
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => setCandidacies(data));
 }

  useEffect(()=>{
    console.log("wa");
    getListCandidacyInter()},[]);



  
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
      <CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />

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
                  <CardBody>

                    <CardTitle tag="h5">{candidacy.offer.title}</CardTitle>
                    <CardTitle tag="h5">{candidacy.status}</CardTitle>

                    <p>{new Date(candidacy.dateApply).toLocaleDateString()}</p>
                    <Button color="primary" onClick={() => history.push(`/showApply?param=${candidacy.offer._id}`)}>

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


export default ListCAndidiesIntern;