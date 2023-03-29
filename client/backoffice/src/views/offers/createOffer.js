/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { API } from "../../config";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

function CreateOffer() {
 
  const [formData, setFormData] = useState({
    title: "",
    type_offre: "",
    description: "",
    availability: "",
    duration: "",
    location: "",
    languages: "",


  });


  const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await fetch(`${API}/Offer/addOffer`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      // body: JSON.stringify({ name,email, password })
      body: JSON.stringify(formData)

      });

      //const { token } = await response.json();
      //localStorage.setItem("token", token);
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
                  {/* <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Offer's Category</label>
                        <Input
                          placeholder="category"
                          type="select"
                          value={formData.type_offre}
                          onChange= {(e)=> setFormData({ ...formData, type_offre: e.target.value})}
                        >

                        <option value="summer">Summer Internship</option>
                        <option value="worker">Worker Internship</option>
                        <option value="pre-hiring">Pre-hiring Internship</option>
                        <option value="PFE">PFE Internship</option>
                        </Input>
                       

                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Category</label>
                        <Input
                          placeholder="type_offre"
                          type="text"
                          value={formData.type_offre}
                          onChange= {(e)=> setFormData({ ...formData, type_offre: e.target.value})}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                 
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>description</label>
                        <Input
                          placeholder="Description"
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
                        <label>availability</label>
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
                        <label>Languages</label>
                        <Input
                          placeholder="languages"
                          type="text"
                          value={formData.languages}
                          onChange= {(e)=> setFormData({ ...formData, languages: e.target.value})}

                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Languages</label>
                        <Input
                          placeholder="languages"
                          type="select"
                          value={formData.languages}
                          onChange= {(e)=> setFormData({ ...formData, languages: e.target.value})}
                        >
                        <option value="">Select a Language</option>
                        <option value="arabic">Arabic</option>
                        <option value="french">French</option>
                        <option value="english">English</option>
                        <option value="german">German</option>

                       
                        </Input>
                       

                      </FormGroup>
                    </Col>
                  </Row> */}

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Create Offer
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

export default CreateOffer;
