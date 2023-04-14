import React ,{useEffect, useState} from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory } from "react-router-dom";
import { API } from "config";
import OfferHeader from "components/Headers/OfferHeader";
import { Button, Card, CardImg, Col, Container, Row } from "reactstrap";


function OfferDetails() {
    const id = localStorage.getItem("id");
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null); // Nouvel état

    const history = useHistory();

    async function getOfferDetails(id) {
        try {
          const response = await fetch(`${API}/displayOffer/${id}`, {
            credentials: 'include'
          });
          const data = await response.json();
          return data; // retourne directement l'objet de l'offre
        } catch (error) {
          console.error(error);
        }
    }

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
    document.body.classList.add("landing-page");

    // appel de la fonction getOfferDetails pour récupérer l'offre avec l'id correspondant à partir de l'API
    getOfferDetails(id).then((data) => {
        setOffers(data); // met à jour l'état offers avec l'objet de l'offre retourné par l'API
    });

    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, [id]); // met à jour l'effet à chaque fois que l'id change

//   return(
//     <>
//         <ExamplesNavbar />
//         <OfferHeader />

//         <Container style={{ marginTop: "30px" }}>
//             <Row>
//                 <Col md={4}>
//                     <CardImg 
//                         variant="top"
//                         src={"../../assets/uploads"}
//                     />
//                 </Col>
//             </Row>
//         </Container>
//     </>
//   )
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
            {/* <h2>{selectedOffer ? selectedOffer.title : ''}</h2>
            <p>{selectedOffer ? selectedOffer.description : ''}</p> */}
            <Button color="primary" onClick={() => history.goBack()}>
              Go back
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
  
}


export default OfferDetails;
