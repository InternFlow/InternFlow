import { API } from "../../config";
import React, { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Accordion from "components/Accordion";
import { BsPencilSquare, BsXSquare } from "react-icons/bs";
import { PlusCircleFill } from "react-bootstrap-icons";
import moment from "moment";
import Swal from "sweetalert2";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

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
  Col,
} from "reactstrap";
import axios from "axios";
import CondidatNavbar from "components/Navbars/CondidatNavbar";

function AddOffer() {
  const history = useHistory();
  const [newSkill, setNewSkill] = useState(""); // Nouveau champ pour stocker la nouvelle compétence
  const id = localStorage.getItem("id");
  // const [companyId, setCompanyId] = useState(id);
  const [errors, setErrors] = useState({});

  const [updatedUserData, setUpdatedUserData] = useState({
    skills: [],
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [categories, setCategories] = React.useState([]);
  const [sumDays, setSumDays] = useState("");

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
    offre_file: "",
    category_offre:""
  });

  const OffreData = new FormData();
  OffreData.append("file", formData.offre_file);
  OffreData.append("upload_preset", "ce5nvvl8");


  

  const validate = async (values) => {
    const errors = {};

    // if (!values.title) {
    //   errors.title = "Title is required";

    //   Swal.fire({
    //     icon: "error",
    //     title: "there is an Error...",
    //     text: "Title is required!",
    //   });
    // }






    

    //----------------- Availability --------------------------------//

    if (!values.availability) {
      errors.availability = "Availability is required";

      Swal.fire({
        icon: "error",
        title: "there is an Error...",
        text: "Availability is required!",
      });
    } else if (
      formData.availability !== "full-time" &&
      formData.availability !== "Full-time" &&
      formData.availability !== "Full-Time" &&
      formData.availability !== "half-time" &&
      formData.availability !== "Half-time" &&
      formData.availability !== "Half-Time" &&
      formData.availability !== "OnSite" &&
      formData.availability !== "Online"
    ) {
      errors.availability = "Invalid availability";
      Swal.fire({
        icon: "error",
        title: "there is an Error...",
        text: "Availability is invalid!",
      });
    }
  };

  //------------------------------ HandleFile ---------------------------------------//

  const handleFile = async (e) => {
    const offre_file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", offre_file);
    formdata.append("cloud_name", "djjimxala");
    formdata.append("upload_preset", "ce5nvvl8");

    let res = await fetch(
      "https://api.cloudinary.com/v1_1/djjimxala/auto/upload",
      {
        method: "post",
        mode: "cors",
        body: formdata,
      }
    );

    let json = await res.json();
    console.log(JSON.stringify(json.secure_url));
    // setFormData({ ...formData, offre_file: offre_file });
    setFormData((prevFormData) => ({
      ...prevFormData,
      offre_file: json.secure_url,
    }));

    console.log(formData.offre_file);

    // console.log(res.public_id);

    // console.log(formData);
  };

  //-------------------------- HandleSubmit ----------------------------------------//

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (!formData.title) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'Title is required!',
        });
        return;
      }
       if (!formData.type_offre) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'Category is required!',
        });
        return;
      }
       if (!formData.description) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'Description is required!',
        });
        return;
      }
      else if (formData.description.trim().split(" ").length<5) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'Description should contain at least 5 words!',
        });
        return;
      }
      if (!formData.availability) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'Availibility is required!',
        });
        return;
      }

      if (formData.startDate >= formData.endDate) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'StartDate is invalid!, you can either change the start Date or change the end Date',
        });
        return;
      }
      if (!formData.location) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'Location is required!',
        });
        return;
      }
      if (!formData.nb_places_available) {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'Number of Places available is required!',
        });
        return;
      }

      const response = await fetch(
        `http://localhost:5000/AjoutercompaniesFil/${id}/offers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          config,
          body: JSON.stringify(formData),
        }
      );

      if (response.ok){
      console.log("Offer added successfully", formData);
        history.push(`/profile`);
      Swal.fire("Success!", "Offer added successfully!", "success");}
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error Field...',
          text: 'NuSomething went wrong!',
        });
      }

      
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setAlertMessage("Something went wrong!");
      // Swal.fire({
      //   icon: "error",
      //   title: "Offer not created...",
      //   text: "Something went wrong!",
      // });
    }
  };


  const handleSkillChange = (event) => {
    const value= event.target.value;

    const index = event.target.getAttribute("data-index");
    setFormData((prevUpdatedUserData) => {
      const newUserData = { ...prevUpdatedUserData };
      newUserData.skills[index] = value;
      console.log()
      return newUserData;
    });
  };

  const handleFileUpload = (result) => {
    if (result && result.url) {
      setFormData({ ...formData, offre_file: result.url });
    } else {
      console.error("Error uploading file: invalid response");
    }
  };

  React.useEffect(() => {
      
    fetch('http://localhost:5000/Category/allCategories', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => console.error(error));

}, []);

console.log(categories);


const calcDuration=(date)=>{
  const dd= moment(formData.startDate);
  const df= moment(date);
  const diffInDays = df.diff(dd, 'days');
  setSumDays(diffInDays);
  setFormData(prevState => ({
    ...prevState,
    duration: diffInDays
  }));
  console.log(diffInDays);
};
  return (
    <>
<CondidatNavbar></CondidatNavbar>
        <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            
            <br></br>
            <br></br>

            <Row>
              <Col md="12" className="mx-auto text-center">
                <Card className="card-user col-md-12">
                  <CardHeader>
                    <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                      Add a new Offer
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                    <Row>

                        <Col md="6">
                        <div class="form-group">
  <label class="form-label">Title</label>
  <input
    class="form-input"
    placeholder="Title"
    type="text"
    value={formData.title}
    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
  />

</div>
                        </Col>
                        <Col md="6">
                        <div class="form-group">
  <label class="form-label" for="category-offer-select">Category of Offer</label>
  <select
    class="form-select"
    id="category-offer-select"
    name="select category"
    value={formData.category_offre}
    onChange={(e) => setFormData({ ...formData, category_offre: e.target.value })}
  >
    <option value="">Select your Category of Offer</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>{category.name}</option>
    ))}
  </select>
  
</div>
                        </Col>
</Row>
                      <Row>
                        <Col md="6">
                        <div class="form-group">
                            <label class="form-label" for="category-offer-select">Type of Offer</label>
                            <select
                                class="form-select"

                              id="type_offre"
                              type="select"
                              name="select type"
                              value={formData.type_offre}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  type_offre: e.target.value,
                                })
                              }
                            >
                              <option value="">
                                Select your type of Offer
                              </option>
                              <option value="summer">Summer</option>
                              <option value="worker">Worker</option>
                              <option value="pre-hiring">Pre-Hiring</option>
                              <option value="PFE">PFE</option>
                              <option value="recherche">Recherche</option>
                              
                              </select>
                          </div>
                        </Col>
                      
                        <Col md="6">
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <input
                                class="form-field"
                                      placeholder="description"
                              type="textarea"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              
                            />
                     </div>              
                               </Col>

                      </Row>

                      



                      <Row>

                      <Col md="6">
                        <div class="form-group">
                            <label class="form-label" for="category-offer-select">Availability</label>
                            <select
                                class="form-select"

                              id="type_offre"
                              type="select"
                              name="select type"
                              value={formData.availability}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  availability: e.target.value,
                                })
                              }
                            >
                              <option value="">
                                Availability
                              </option>
                              <option value="Full-Time">Full-Time</option>
                              <option value="Half-Time">Half-Time</option>
                              <option value="Online">Online</option>
                              <option value="OnSite">OnSite</option>
                              
                              </select>
                          </div>
                        </Col>


                      
                        <Col md="6">
                        <div class="form-group">
                            <label class="form-label">StartDate</label>
                            <input
                                                  class="form-input"

                              type="date"
                              name="date"
                              id="exampleDate"
                              placeholder="date placeholder"
                              value={formData.startDate}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  startDate: e.target.value,
                                })
                              }
                              
                            />
                              {/* {!formData.startDate && <div style={{ color: 'red', fontWeight: 'bold' }}>StartDate is required!</div>} */}

                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <div class="form-group">
                            <label class="form-label">EndDate</label>
                            <input
                                                          class="form-input"

                              type="date"
                              name="date"
                              id="exampleDate"
                              placeholder="date placeholder"
                              value={formData.endDate}
                              onChange={(e) => {
                                setFormData({ ...formData, endDate: e.target.value });
                                calcDuration(e.target.value); // Appeler une autre fonction
                              }}
                              
                            />
                              {/* {!formData.endDate && <div style={{ color: 'red', fontWeight: 'bold' }}>EndDate is required!</div>} */}

                          </div>
                        </Col>
                     
                        <Col md="6">
                        <div class="form-group">
                            <label class="form-label">Duration</label>
                            <input
                                                          class="form-input readonly"
                              placeholder={sumDays}
                              type="text"
                              value={sumDays}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  duration: {sumDays},
                                })
                                
                              }
                            />
                              <p>days</p>


                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label class="form-label">Location</label>
                            <input
                                                          class="form-input"

                              placeholder="location"
                              type="text"
                              value={formData.location}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  location: e.target.value,
                                })
                              }
                              
                            />
                              {/* {!formData.location && <div style={{ color: 'red', fontWeight: 'bold' }}>Location is required!</div>} */}

                          </FormGroup>
                        </Col>
                     
                        <Col md="6">
                          <FormGroup>
                            <label class="form-label">Nb of Places</label>
                            <input
                                                          class="form-input"

                              placeholder="nb_places_available"
                              type="number"
                              value={formData.nb_places_available}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nb_places_available: e.target.value,
                                })
                              }
                            />
                              {/* {!formData.nb_places_available && <div style={{ color: 'red', fontWeight: 'bold' }}>Number of Places is required!</div>} */}

                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label class="form-label">Languages</label>
                            <select
                                                            class="form-select"

                              id="languages"
                              type="select"
                              name="select offer"
                              value={formData.languages}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  languages: e.target.value,
                                })
                              }
                              
                            >
                              <option value="">Select your Language</option>
                              <option value="arabic">Arabic</option>
                              <option value="french">French</option>
                              <option value="english">English</option>
                              <option value="german">German</option>
                              <option value="italian">Italian</option>
                              <option value="chinese">Chinese</option>
                            </select>
                          </FormGroup>
                        </Col>


                      {/** Skills */}

                      <div style={{ marginBottom: "20px" }}>
                        {formData.skills.map((skill, index) => {
                          return (
                            <Col
                              key={`skill-${index}`}
                              style={{ marginBottom: "20px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <label class="form-label">Skills:</label>
                                <Input
                                  name="skills"
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
                                    setFormData(
                                      (prevUpdatedUserData) => {
                                        const newUserData = {
                                          ...prevUpdatedUserData,
                                        };
                                        formData.skills.splice(index, 1);
                                        return newUserData;
                                      }
                                    )
                                  }
                                  style={{
                                    padding: "0 10px",
                                    background: "none",
                                    border: "none",
                                    outline: "none",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  
                                </button>
                              </div>
                            </Col>
                          );
                        })}
                      </div>

                        <label>
                          <strong>Skills</strong>
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prevUpdatedUserData) => {
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
                          <PlusCircleFill
                            style={{ color: "#7D7D7D", fontSize: "35" }}
                          ></PlusCircleFill>
                        </button>
                      </Row>

                      {/** End Skills */}

                      <br></br>
                      <br></br>

                      {/** File Upload */}
                      {/* <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Offer File</label>
                          
                             <Input
                          placeholder="offre_file"
                          type="file"
                          value={formData.offre_file}
                          onChange={(e) => setFormData({ ...formData, offre_file: e.target.files[0] })}
                        /> 
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
                          <span style={{ marginRight: "120px" }} />

                          <Button
                            className="btn-round"
                            color="danger"
                            onClick={() => history.goBack()}
                          >
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
