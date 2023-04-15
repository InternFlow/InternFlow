import React ,{useEffect, useState} from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { API } from "config";
import OfferHeader from "components/Headers/OfferHeader";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import { data } from "jquery";


function OfferDetails() {
     const id = localStorage.getItem("id");
    // const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL
    const [offer, setOffers] = useState([]); // initialiser à null
    const [selectedOffer, setSelectedOffer] = useState(null); // Nouvel état


    const history = useHistory();

  

  
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
    document.body.classList.add("landing-page");

    // appel de la fonction getOfferDetails pour récupérer l'offre avec l'id correspondant à partir de l'API
   

    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []); // met à jour l'effet à chaque fois que l'id change

  // useEffect(() => {
  //   if (id) { // add a check for the id parameter
  //     fetch(`${API}/Offer/displayOffer/${id}`, {
  //       credentials: 'include'
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       setOffers(data);
  //       // setSelectedOffer(data); // Set the fetched offer as the selected offer
  //       // console.log(setOffers(data));

  //     })      
  //     .catch(error => console.error(error));
  //   }
  // }, [id]);
  useEffect(() => {
    if (offer._id) {
      // add a check for the id parameter
      fetch(`${API}/Offer/displayOffer/${offer._id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setOffers(data);
          setSelectedOffer(data); // Set the fetched offer as the selected offer
          console.log(response);
        })
        .catch((error) => console.error(error));
    }
  }, [offer._id]);
  

  console.log(offer._id);

  console.log(offer);


  if (!offer) {
    return <div>Loading...</div>;
  }


return(
    <>
      <ExamplesNavbar />
      <OfferHeader />
  
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col md={4}>
            <CardImg 
              variant="top"
            //   src={`../../assets/uploads/offers/${offers.image}`}
            />
          </Col>
          <Col md={8}>
          <Card className="mb-4"  key={offer._id}>
                  <CardBody>
                    <CardTitle tag="h5">{offer.title}</CardTitle>
                    <CardText>{offer.type_offre} </CardText>                    
                    <CardText>Description: {offer.description} </CardText>
                    <CardText> Availability: {offer.availability} </CardText>                    
                    <CardText>Duration: {offer.duration} </CardText>                    
                    <CardText>Location: {offer.location} </CardText>                    
                    <CardText>Requisted Languages:{offer.languages} </CardText>                    

                
                  </CardBody>
                </Card>
            <Button color="primary" onClick={() => history.goBack()}>
              Go back
            </Button>

            <Button color="secondary">
              Apply
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
  
}


export default OfferDetails;





