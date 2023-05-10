import { API } from "../../config";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Accordion from 'components/Accordion';
import {BsPencilSquare, BsXSquare } from 'react-icons/bs';
import { PlusCircleFill } from 'react-bootstrap-icons'
import moment from "moment";
import Swal from "sweetalert2";
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
  Col
} from "reactstrap";
import axios from "axios";
import CondidatNavbar from "components/Navbars/CondidatNavbar";

function EditOffer() {
    const history = useHistory();
    const companyId = localStorage.getItem("id");
    // const [offers, setOffers] = useState([]);
    // console.log(offers._id);
    const params = useParams();


    // const offerId = localStorage.getItem("offers._id");
    //const location = useLocation();
    //const offerId = new URLSearchParams(location.search).get('param');

    //const offerId = new URLSearchParams(location1.search).get('param');
    //const {offerId} = useParams();
    // const offerId = localStorage.getItem('offerId');
    // localStorage.setItem('offerId', offerId);
    // console.log(offerId);



    


    const [updatedUserData, setUpdatedUserData] = useState({
        skills: []
      });
      

    const [offerData, setOfferData] = useState({
        title: '',
        type_offre: '',
        description: '',
        availability: '',
        startDate: '',
        endDate: '',
        duration: '',
        location: '',
        nb_places_available: '',
        languages: '',
        skills: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        // Ajoutez les champs à la FormData
        formData.append('title', offerData.title);
        formData.append('type_offre', offerData.type_offre);
        formData.append('description', offerData.description);
        formData.append('availability', offerData.availability);
        formData.append('startDate', offerData.startDate);
        formData.append('endDate', offerData.endDate);
        formData.append('duration', offerData.duration);
        formData.append('location', offerData.location);
        formData.append('nb_places_available', offerData.nb_places_available);
        formData.append('languages', offerData.languages);
        formData.append('skills', offerData.skills);

        try {

       
      const body = {
        title: offerData.title,
        type_Offer: offerData.type_Offer,
        description: offerData.description,
        availability: offerData.availability,
        duration: offerData.duration,
        location: offerData.location,
        languages: offerData.languages,
      };

    
          
          const response = await fetch(`${API}/Modifiercompanies/${companyId}/offers/${params.id}`, {
            method: "PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
          });

        const data = await response.json();
        console.log(data);
          // console.log(response.data);
          console.log(formData);
          // Faire quelque chose avec la réponse

          Swal.fire("Success!", "Offer updated successfully!", "success");

        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Offer not created...",
            text: "Something went wrong!",
          });
        }
    };

    


    const handleSkillChange = (event) => {
        const { value, dataset: { index } } = event.target;
        setUpdatedUserData((prevUpdatedUserData) => {
          const newUserData = { ...prevUpdatedUserData };
          newUserData.skills[index] = value;
          return newUserData;
        });
      };


    return(
        <>
<CondidatNavbar></CondidatNavbar>
             <ProfilePageHeader />

             <div className="section profile-content" >
                <Container>
                <div className="owner">
                <br></br>
            <h1>Update Offer</h1>
            <br></br>

          <Row >
           
          <Col md="8" className="mx-auto text-center">

            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Edit the Offer</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>


                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                        placeholder="Title"
                        type="text"
                        value={offerData.title}
                        onChange={(event) => setOfferData({...offerData, title: event.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Type of Offer</label>
                        <Input
                        id="type_offre"
                        type="select"
                        name="select type"
                        value={offerData.type_offre} 
                        onChange={(event) => setOfferData({...offerData, type_offre: event.target.value})}
                        >
                          <option value="summer">Summer</option>
                            <option value="worker">Worker</option>
                            <option value="pre-hiring">Pre-Hiring</option>
                            <option value="PFE">PFE</option>
                            <option value="recherche">Recherche</option>


                        </Input>
                       
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          placeholder="description"
                          type="textarea"
                          value={offerData.description} 
                          onChange={(event) => setOfferData({...offerData, description: event.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Availability</label>
                        <Input
                          placeholder="availability"
                          type="text"
                          value={offerData.availability} 
                          onChange={(event) => setOfferData({...offerData, availability: event.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>StartDate</label>
                        <Input 
                        type="date" 
                        name="date" 
                        id="exampleDate" 
                        placeholder="date placeholder" 
                        value={offerData.startDate} 
                        onChange={(event) => setOfferData({...offerData, startDate: event.target.value})}
                        />

                       
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>EndDate</label>
                        <Input 
                        type="date" 
                        name="date" 
                        id="exampleDate" 
                        placeholder="date placeholder" 
                        value={offerData.endDate} 
                        onChange={(event) => setOfferData({...offerData, endDate: event.target.value})}
                        />

                       
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Duration</label>
                        <Input
                          placeholder="duration"
                          type="text"
                          value={offerData.duration} 
                          onChange={(event) => setOfferData({...offerData, duration: event.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Location</label>
                        <Input
                          placeholder="location"
                          type="text"
                          value={offerData.location} 
                          onChange={(event) => setOfferData({...offerData, location: event.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Nb of Places</label>
                        <Input
                          placeholder="nb_places_available"
                          type="number"
                          value={offerData.nb_places_available} 
                          onChange={(event) => setOfferData({...offerData, nb_places_available: event.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

               
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Languages</label>
                        <Input
                        id="languages"
                        type="select"
                        name="select offer"
                        value={offerData.languages} 
                        onChange={(event) => setOfferData({...offerData, languages: event.target.value})}                        >
                          <option value="arabic">Arabic</option>
                            <option value="french">French</option>
                            <option value="english">English</option>
                            <option value="german">German</option>
                            <option value="italian">Italian</option>
                            <option value="chinese">Chinese</option>


                        </Input>
                       
                      </FormGroup>
                    </Col>
                  </Row>

                 
                  {/** Skills */}

                  <Row style={{marginBottom: "20px"}}>
  {updatedUserData.skills.map((skill, index) => {
    return (
      <Col key={`skill-${index}`} style={{marginBottom: "20px"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>Skills:</label>
          <Input
            name="skill"
            data-index={index}
            value={offerData.skills} 
            onChange={(event) => setOfferData({...offerData, skills: event.target.value})}
            // onChange={handleSkillChange}
            // value={skill}
            // onChange={handleSkillChange}
            style={{
              paddingRight: "30px",
              width: `${skill.length * 9 + 20}px`,
              // you can adjust the 9 and 20 values to fit your design
            }}
          />
          <button
            type="button"
            onClick={() =>
              setUpdatedUserData((prevUpdatedUserData) => {
                const newUserData = { ...prevUpdatedUserData };
                newUserData.skills.splice(index, 1);
                return newUserData;
              })
            }
            style={{
              padding: "0 10px",
              background: "none",
              border: "none",
              outline: "none",
              fontWeight: "bolder"
            }}
          >
            X
          </button>
        </div>
      </Col>
    );
  })}
</Row>
<Row>
  <button
    type="button"
    onClick={() =>
      setUpdatedUserData((prevUpdatedUserData) => {
        const newUserData = { ...prevUpdatedUserData };
        newUserData.skills.push("");
        return newUserData;
      })
    }
    style={{
      padding: "0 10px",
      background: "none",
      border: "none",
      outline: "none",
      fontWeight: "bolder",
    }}
  >
    <PlusCircleFill style={{color:"#7D7D7D", fontSize: "35"}}></PlusCircleFill>
  </button>
</Row>


                  {/** End Skills */}

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Edit Offer
                      </Button>
                      <span style={{ marginRight: '120px' }} />

                      <Button 
                        className="btn-round"
                        color="danger" 
                        onClick={() => history.goBack()}>
                          Go back
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          </Row>
                </div>
                </Container>
             </div>
        </>
    )
    
}

export default EditOffer;