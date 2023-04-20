import { API } from "../../config";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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

function EditOffer() {
    const companyId = localStorage.getItem("id");
    const offerId = localStorage.getItem("id");


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
        try {
          const response = await axios.put(`/Modifiercompanies/${companyId}/offers/${offerId}`, offerData);
          console.log(response.data);
          // Faire quelque chose avec la réponse
        } catch (error) {
          console.error(error);
        }
    };

    // console.log(handleSubmit);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setOfferData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    function handleInput(event) {
        const value = event.target.value;
        // Faites quelque chose avec la valeur ici
      }

    // console.log(handleChange);


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
             <ExamplesNavbar />
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
                        onChange={handleInput}
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
                        onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                        onChange={handleChange}

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
                        onChange={handleChange}
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
                        onChange={handleChange}

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
                        onChange={handleChange}

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
                          onChange={handleChange}

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
                        onChange={handleChange}
                        >
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
            onChange={handleChange}
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
                        onClick={() => useHistory.goBack()}>
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