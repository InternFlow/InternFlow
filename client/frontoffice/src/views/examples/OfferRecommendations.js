
import { API } from "config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import offerImage from "../uploads/offers/1681389235310-offers.jpg";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Table,
  CardImg,
  Col,
  Row,
  Button,
} from "reactstrap";
import CondidatNavbar from "components/Navbars/CompanyNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";

function OfferRecommendations(props) {
  const [recommendedOffers, setRecommendedOffers] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/Offer/condidatRecommendations/${id}`
      );
      const data = await response.json();
      console.log(data)
      setRecommendedOffers(data.recommendedOffers);
    }
    fetchData();
  }, [id]);
  console.log(recommendedOffers);


  //----------------------------- Card State -----------------------------------------------//
  const [cardState, setCardState] = useState({});
  const handleCardState = (id) => {
    setCardState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    
    <div>
         <CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />

      <h3 style={{fontWeight: 'bold' }}>My Offers</h3>
      <Row>
        <Col md="9">
          <Row className="justify-content-center my-4">
            {recommendedOffers.map((offer) => (
              <Col
                xs="12"
                sm="7"
                md="8"
                lg="4"
                key={offer.offer.id}
                className="mb-4"
              >
                <Card
                  className="mb-4 h-100"
                  style={{ marginBottom: "180px", margin: "20px" }}
                >
                  <CardImg top width="10%" src={offerImage} alt="Offer Image" />
                  <CardBody>
                    <CardTitle tag="h5">{offer.offer.title}</CardTitle>
                    {/* <CardText>{offer.offer.description}</CardText> */}
                    <p>
                      {offer.offer.description.length > 100
                        ? cardState[offer.offer.id]
                          ? offer.offer.description
                          : `${offer.offer.description.slice(0, 100)}...`
                        : offer.offer.description}
                      {offer.offer.description.length > 100 && (
                        <Button
                          color="link"
                          size="sm"
                          className="p-0"
                          onClick={() => handleCardState(offer.offer.id)}
                        >
                          {cardState[offer.offer.id]
                            ? "Show less"
                            : "Show more"}
                        </Button>
                      )}
                    </p>

                    <CardText>
                      Compétences requises : {offer.offer.skills.join(", ")}
                    </CardText>
                    <CardText>
                      Pertinence : {offer.relevanceScore.toFixed(2)}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default OfferRecommendations;