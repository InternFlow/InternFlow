
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
  Button,CardImg, CardSubtitle
} from "reactstrap";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import { API } from "config";
import CondidatNavbar from "components/Navbars/CondidatNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import offerImage from "../uploads/offers/1681389235310-offers.jpg";
import { set } from "react-hook-form";
import OfferHeader from "components/Headers/OfferHeader";

function ListCAndidiesIntern() {
  const id = localStorage.getItem("id");
  // const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL
  const [title, setTitle] = useState("");
 
  const [candidacies, setCandidacies] = useState([
    {_id:"",
    dateApply:"",
      status: "",
      offer: 
        {
          _id:"",
          title:"",
          company: {
            _id:"",
            name:"",
            pfpPath:""
          }
        }
      
     
      }
      

  ]);

 
  async function getListCandidacyInter(){
    fetch(`${API}/Candidacy/getListCandidacyInter/${id}`, {
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => {
      setCandidacies(data);
      console.log('Data received:', data);
      // Perform additional processing with the data or call another API
      return data;
    })
    .then((data) => {
setFilteredCandidacies(data);
      // Handle data returned from the previous then() method
      // Perform additional processing or return the final result
      console.log('Additional processing:', data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
 
  React.useEffect(()=>{
    console.log("wa");
    getListCandidacyInter()},
[]);
const [filteredCandidacies, setFilteredCandidacies] = useState(candidacies);
console.log(filteredCandidacies);
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

  const initialCandidacies = [
    {
      _id:"",
      dateApply:"",
      status: "Accepted",
      offer: {
        _id:"",
        title:"",
        company: {
          _id:"",
          name:"",
          pfpPath:""
        }
      }
    },
    {
      _id:"",
      dateApply:"",
      status: "Rejected",
      offer: {
        _id:"",
        title:"",
        company: {
          _id:"",
          name:"",
          pfpPath:""
        }
      }
    },
    {
      _id:"",
      dateApply:"",
      status: "Pending",
      offer: {
        _id:"",
        title:"",
        company: {
          _id:"",
          name:"",
          pfpPath:""
        }
      }
    }
  ]
  const [status, setStatus] = useState('All');


const filterByStatus = (status) => {
  if (status === 'All') {
    setFilteredCandidacies(candidacies);
  } else {
    const filtered = candidacies.filter((candidacy) => candidacy.status === status);
    setFilteredCandidacies(filtered);
  }
};

return (
  <>
   <CondidatNavbar />
      <OfferHeader />
  <div className="section profile-content">
    <br></br>
    <Container>
      <div className="owner">
        <div>
          <Button color="primary" onClick={() => filterByStatus('All')}>All</Button>{' '}
          <Button color="primary" onClick={() => filterByStatus('approved')}>Accepted</Button>{' '}
          <Button color="primary" onClick={() => filterByStatus('rejected')}>Rejected</Button>{' '}
          <Button color="primary" onClick={() => filterByStatus('pending')}>Pending</Button>{' '}
        </div>
        <Row>
          <Col md="12">
            <Row>
              {filteredCandidacies.map((candidacy) => (
                <Col md="4" key={candidacy._id}>
                  <Card className="mb-4">
                    <CardImg top src={candidacy.offer.company.pfpPath} alt="Offer Image" className="center-img iii" />
                    <CardBody>
                      <CardTitle tag="h5">{candidacy.offer.title}</CardTitle>
                      <CardSubtitle tag="h6">{candidacy.offer.company.name}</CardSubtitle>
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
  </>
);

}


export default ListCAndidiesIntern;