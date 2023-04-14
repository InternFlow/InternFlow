
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
  Col
} from "reactstrap";
import axios from "axios";

function CreateOffer() {
 

  const [formData, setFormData] = useState({
    title: "",
    type_offre: "",
    description: "",
    availability: "",
    duration: "",
    location: "",
    languages: "",
    image: null,

  });


  const history = useHistory();


  //-------------------- SubmitOffer -----------------------------//
  // const submitOffer = async (formData) => {
  //   try {
  //     const response = await fetch(`${API}/Offer/addOfferImg`, {
  //       method: 'POST',
  //       body: formData
  //     });
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, type_offre, description, availability, duration, location, image } = formData;

    const data = new FormData();
    data.append("title", title);
    data.append("type_offre", type_offre);
    data.append("description", description);
    data.append("availability", availability);
    data.append("duration", duration);
    data.append("location", location);
    data.append("image", image);

    try {
      await axios.post("http://localhost:5000/Offer/addOfferImg", data);
      console.log("Offer added successfully");

      Swal.fire(
              'Success!',
              'Offer added successfully!',
              'success'
      )

      history.push("/admin/dashboard");

    } catch (error) {
      console.error(error);
      Swal.fire({
               icon: 'error',
               title: 'Offer not created...',
               text: 'Something went wrong!',
      })

    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };


  //-------------------- handleSubmit --------------------------------//
  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData(e.target);
  //     await submitOffer(formData);
  //     Swal.fire(
  //      'Success!',
  //      'Offer added successfully!',
  //      'success'
  //     )
  //     history.push("/admin/dashboard");
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Offer not created...',
  //       text: 'Something went wrong!',
  //     })
  //   }

  //   console.log(formData);
  // };


  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   try {
  //     await fetch(`${API}/Offer/addOfferImg`, {
  //       method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     credentials: 'include',
  //     // body: JSON.stringify({ name,email, password })
  //     body: JSON.stringify(formData)

  //     });

  //      Swal.fire(
  //      'Success!',
  //      'Offer added successfully!',
  //      'success'
  //      )

  //     //const { token } = await response.json();
  //     //localStorage.setItem("token", token);
  //     history.push("/admin/dashboard");
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Offer not created...',
  //       text: 'Something went wrong!',
  //     })
  //   }

  //   console.log(formData);

  // };

  
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
                          <option value="summer">Summer</option>
                            <option value="worker">Worker</option>
                            <option value="pre-hiring">Pre-Hiring</option>
                            <option value="PFE">PFE</option>
                            <option value="recherche">Recherche</option>


                        </Input>
                        {/* <Input
                          placeholder="type_offre"
                          type="text"
                          value={formData.type_offre}
                          onChange= {(e)=> setFormData({ ...formData, type_offre: e.target.value})}

                        /> */}
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
                        id="languages"
                        type="select"
                        name="select offer"
                        value={formData.languages}
                        onChange= {(e)=> setFormData({ ...formData, languages: e.target.value})}
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
                  <Row>
                  <Col md="6">
                      <FormGroup>
                        <label>Image</label>
                        <input type="file" className="form-control-file" onChange={handleFileChange} />
                        {/* <input
                          type="file"
                          // accept="image/*"
                          onChange={(e) => {
                            setFormData({ ...formData, image: e.target.files[0] });
                            }}
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

