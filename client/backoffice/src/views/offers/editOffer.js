

import { API } from "../../config";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';

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
  Col
} from "reactstrap";

function EditOffer({ offer = { title: "", type_offre: "", description: "", availability: "", duration: "", location:"", languages: "" } }) {
    const [title, setTitle] = useState(offer.title);
    const [type_Offer, setTypeOffer] = useState(offer.type_offre);
    const [description, setDescription] = useState(offer.description);
    const [availability, setAvailability] = useState(offer.availability);
    const [duration, setDuration] = useState(offer.duration);
    const [location, setLocation] = useState(offer.location);
    const [languages, setLanguages] = useState(offer.languages);


    const location1 = useLocation();
  const searchParams = new URLSearchParams(location1.search);
  const id = searchParams.get('id');
  console.log(id);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type_Offer", type_Offer);
    formData.append("description", description);
    formData.append("availability", availability);
    formData.append("duration", duration);
    formData.append("location", location);
    formData.append("languages", languages);



    const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        title: title,
        type_Offer: type_Offer,
        description: description,
        availability: availability,
        duration: duration,
        location: location,
        languages: languages,

    };
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: 'include'
    };
    const response = await fetch(`${API}/Offer/EditOffer/${id}`, requestOptions);
      const data = await response.json();
      //   onUpdate(data.user);
console.log(data)
      history.push("/admin/dashboard");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };


  return (
    <>
      <div className="content">
        <Row>

          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Edit an Offer</CardTitle>
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
                        value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>type OF Offer</label>
                        <Input
                          placeholder="type_offer"
                          type="text"
                          value={type_Offer}
                          onChange={(event) => setTypeOffer(event.target.value)}

                        />
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
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}

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
                          value={availability}
                          onChange={(event) => setAvailability(event.target.value)}

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
                          value={duration}
                          onChange={(event) => setDuration(event.target.value)}

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
                          value={location}
                          onChange={(event) => setLocation(event.target.value)}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                 
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Languages</label>
                        <select id="languages" value={languages} onChange={(event) => setLanguages(event.target.value)}>
                            <option value="arabic">Arabic</option>
                            <option value="french">French</option>
                            <option value="english">English</option>
                            <option value="german">German</option>
                        </select>
                        {/* <Input
                          placeholder="Role"
                          type="text"
                          value={formData.role}
                          onChange= {(e)=> setFormData({ ...formData, role: e.target.value})}
                        /> */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Offer
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditOffer;
