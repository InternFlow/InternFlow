import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Accordion from 'components/Accordion';
import {BsPencilSquare, BsXSquare } from 'react-icons/bs';
import { PlusCircleFill } from 'react-bootstrap-icons'
import moment from "moment";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Container,
  Col, CardText, ListGroup,
  ListGroupItem,
  Modal, ModalHeader, ModalBody, ModalFooter, CardImg
} from "reactstrap";
import { error } from "jquery";
import OffersHeader from "components/Headers/OffersHeader";

function AllOffers() {
    const [offers, setOffers] = useState([]);

 
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

   

  };



// const handleChange = (event) => {
//   const { name, value } = event.target;
//   setUpdatedUserData((prevUserData) => {
//     // Create a copy of the previous state to modify
//     const newUserData = { ...prevUserData };
    
//     // Handle changes to scalar attributes
//     if (name !== "educations" && name !== "experiences" && name !== "skills" && name !== "local") {
//       newUserData[name] = value;
//     }
//     // Handle changes to educations or experiences list
//     else if (name === "educations" || name === "experiences") {
//       const index = event.target.getAttribute("data-index");
//       const field = event.target.getAttribute("data-field");
//       newUserData[name][index][field] = value;
//     }
//     // Handle changes to skills or local list
//     else {
//       const index = event.target.getAttribute("data-index");
      
//         newUserData[name][index] = value;
      
//     }
    
//     // Return the modified state
//     return newUserData;
//   });
// };




 


 async function getOffers(){
    fetch('http://localhost:5000/Offer/getOffers', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
       ,credentials: 'include'
      })
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error)=> console.log(error));
    
}

React.useEffect(()=>{
  getOffers();
  
}, []);


  return (
    <>
      <ExamplesNavbar />
      <OffersHeader />
      <div className="section profile-content" >
        <Container>
          <div className="owner">
            <h2>All Offers</h2>
            <br></br>
            {/* <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src=""
                // src={offers.company.pfpPath}
              />
            </div> */}
          <Row >
            {/* <Col md="4" > */}
            {offers.map((offer, index) => (

              <Card className="text-center mb-4 text-md-left" key={offer._id}>
                    <CardImg top src={require("assets/img/logo.png")} alt="Offers" style={{ width: '200px', height: '200px'  }} />
                <CardBody>
                    <CardTitle tag="h5" style={{fontWeight:"bold", fontSize: 18}}>
                        {offer.title}
                    </CardTitle>
                    <CardText tag="h4">{offer.description}</CardText>
                    <CardText tag="h4">{offer.location}</CardText>

                </CardBody>

              </Card >
            ))}
            {/* </Col> */}
            
          </Row>

          
           </div>
        </Container>
      </div>
      <DemoFooter />
    </>
    
  );
}
export default AllOffers;
