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

function AddOffer() {
  const history = useHistory();
  const [newSkill, setNewSkill] = useState(""); // Nouveau champ pour stocker la nouvelle compétence
  const id = localStorage.getItem("id");
  // const [companyId, setCompanyId] = useState(id);


  const [updatedUserData, setUpdatedUserData] = useState({
    skills: []
  });
  

  const [formData, setFormData] = useState({
    title: "",
    type_offre: "",
    description: "",
    availability: "",
    startDate: new Date(),
    endDate: new Date(),
    duration: "",
    location: "",
    nb_places_available: 0,
    languages: "",
    // image: null,
    skills: [],


  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { title, type_offre, description, availability,startDate, endDate ,duration, location,nb_places_available, skills } = formData;

    // // const data = new FormData();
    // formData.append("title", title);
    // formData.append("type_offre", type_offre);
    // formData.append("description", description);
    // formData.append("availability", availability);
    // formData.append("startDate", startDate);
    // formData.append("endDate", endDate);
    // formData.append("duration", duration);
    // formData.append("location", location);
    // formData.append("nb_places_available", nb_places_available);
    // // data.append("image", image);
    // formData.append("skills", JSON.stringify(skills));


    console.log(id);

    try {
      // console.log(`http://localhost:5000/Ajoutercompanies/${id}/offers`);
      // await axios.post("http://localhost:5000/Offer/addOfferImg", data);
      //router.post('/companies/:id/offers' ,async (req, res) => {

      // await axios.post(`http://localhost:5000/Ajoutercompanies/?id=${id}/offers`);

      // const response = await fetch(`http://localhost:5000/Ajoutercompanies/${id}/offers`, {
      //     method: "POST",
      //     body: formData
      //   });

      await fetch(`http://localhost:5000/Ajoutercompanies/${id}/offers`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      // body: JSON.stringify({ name,email, password })
      body: JSON.stringify(formData)

      });

      console.log("Offer added successfully",formData);
      

      Swal.fire(
        'Success!',
        'Offer added successfully!',
        'success'
      )

      history.push(`/profile-company-page`);

    } catch (error) {
      console.error(error);
      Swal.fire({
               icon: 'error',
               title: 'Offer not created...',
               text: 'Something went wrong!',
      })
    }
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };


  const handleSkillChange = (event) => {
    const { value, dataset: { index } } = event.target;
    setUpdatedUserData((prevUpdatedUserData) => {
      const newUserData = { ...prevUpdatedUserData };
      newUserData.skills[index] = value;
      return newUserData;
    });
  };
  


  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section profile-content" >
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                // src={userd.pfpPath}
              />
            </div>
            <br></br>
            <h1>Add Offer</h1>
            <br></br>

          <Row >
           
          <Col md="8" className="mx-auto text-center">

            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Add a new Offer</CardTitle>
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
                        value={formData.title}
                        onChange= {(e)=> setFormData({ ...formData, title: e.target.value})}
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
                        value={formData.type_offre}
                        onChange= {(e)=> setFormData({ ...formData, type_offre: e.target.value})}
                        >
                          <option value="">Select your Category of Offer</option>
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
                          value={formData.description}
                          onChange= {(e)=> setFormData({ ...formData, description: e.target.value})}

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
                          value={formData.availability}
                          onChange= {(e)=> setFormData({ ...formData, availability: e.target.value})}

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
                        value={formData.startDate}
                        onChange= {(e)=> setFormData({ ...formData, startDate: e.target.value})}

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
                        value={formData.endDate}
                        onChange= {(e)=> setFormData({ ...formData, endDate: e.target.value})}

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
                          value={formData.duration}
                          onChange= {(e)=> setFormData({ ...formData, duration: e.target.value})}

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
                          value={formData.location}
                          onChange= {(e)=> setFormData({ ...formData, location: e.target.value})}

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
                          value={formData.nb_places_available}
                          onChange= {(e)=> setFormData({ ...formData, nb_places_available: e.target.value})}

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
                        value={formData.languages}
                        onChange= {(e)=> setFormData({ ...formData, languages: e.target.value})}
                        >
                          <option value="">Select your Language</option>
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

                  {/* <Row>
                  <Col md="6">
                      <FormGroup>
                        <label>Image</label>
                        <input type="file" className="form-control-file" onChange={handleFileChange} />
                        
                      </FormGroup>
                    </Col>
                  </Row> */}


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
            value={skill}
            onChange={handleSkillChange}
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
  <label><strong>Skills</strong></label>
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
                        Create Offer
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
      <DemoFooter />
    </>
    
  );
}
export default AddOffer;