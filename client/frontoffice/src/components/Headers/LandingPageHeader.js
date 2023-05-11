/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Card, CardBody, CardImg, CardTitle, Col, Container, Row } from "reactstrap";
import offerImage from "../uploads/offers/ll.png";
import CourseListItem from "components/TrainerComponents/CourseListItem";


// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();
  const [offers, setOffers] = useState([]);
  const history = useHistory()
  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });



  const getOffers= async () =>{
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`http://localhost:5000/offer/getOffers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setOffers(data);
        })
        .catch(error => console.error(error));
    }
  }

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <>
    <Container>
    <h4>Browse our internship offers</h4>
    <Row>

      {(offers.length !==0)  &&(<>{offers.slice(0,2).map((offer) => (
              <Col md="3" key={offer.id} style={{margin:"80px"}}>
              <Card className="mb-4"  key={offer.id}>
              <CardImg top width="100%" src={offerImage} alt="Offer Image" />
                <CardBody>
                  <CardTitle tag="h5">{offer.title}</CardTitle>
                  <p>{offer.description}</p>
                  <Button color="primary" onClick={() => history.push(`/DetailsOffers/${offer._id}`)}>
                    View Details
                  </Button>
                  <br></br>
                  <br></br>
                </CardBody>
              </Card>
            </Col>
            ))} </>)}
</Row>

</Container>

    </>
  );
}

export default LandingPageHeader;
