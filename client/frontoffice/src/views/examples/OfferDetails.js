import React ,{useEffect, useState} from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { API } from "config";
import OfferHeader from "components/Headers/OfferHeader";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import { data, error } from "jquery";
import axios from "axios";

// Importez votre image statique ici
import offerImage from "../uploads/offers/1681389235310-offers.jpg";

function OfferDetails() {
    //  const id = localStorage.getItem("id");
    const { id } = useParams();

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

 

  useEffect(()=> {
    axios.get(`${API}/Offer/displayOffer/${id}`)
    .then((res)=>{
      setOffers(res.data);
    })
    .catch((err)=> {
      console.log("Error from OfferDetails");
    })
  }, [id]);
  

  // console.log(offer._id);

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
            <br></br>
            <br></br>
            <br></br>

            <CardImg 
              variant="top"
              // src={`../uploads/offers/${offer.image}`}
              // src={offer.image}
              src={offerImage}
              alt="offer Img"
              height={330}
              width={250}
            />
          </Col>
         
          <Col md={8}>
          <Card className="mb-4"  key={offer._id}>

                  <CardBody>
                    <CardTitle tag="h2">
                      <center>
                      {offer.title}
                      </center>
                    </CardTitle>
                    <br></br>
                    <br></br>

                    <CardText className="h6">Type of Offer: {offer.type_offre} </CardText>                    
                    <CardText className="h6">Description: 
                    <br></br>
                    {offer.description} </CardText>
                    <CardText className="h6"> Availability: {offer.availability} </CardText>                    
                    <CardText className="h6">Duration: {offer.duration} </CardText>                    
                    <CardText className="h6">Location: {offer.location} </CardText>                    
                    <CardText className="h6">Requisted Languages:{offer.languages} </CardText>                    

                
                  </CardBody>
                </Card>
            <Button color="primary" onClick={() => history.goBack()}>
              Go back
            </Button>

            <span style={{ marginRight: '120px' }} />


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





