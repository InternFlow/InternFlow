import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import Swal from "sweetalert2";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";

function AddEvent() {
  //add event
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [place, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [date, setStartdate] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setPicture] = useState("");
  const id = localStorage.getItem("id");

  //get image url

  const Locations = [
    { value: "Onsite", label: "Onsite" },
    { value: "Remote", label: "Remote" },
    { value: "Hybride", label: "Hybride" },
  ];

  const Categorys = [
    { value: "SPORTS", label: "Sports" },
    { value: "BUSINESS", label: "Business" },
    { value: "POLITICAL", label: "Political" },
    { value: "TECHNOLOGY", label: "Technology" },
    { value: "DESIGN", label: "Design" },
    { value: "MARKETING", label: "marketing" },
  ];

  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption.value);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDateChange = (event) => {
    setStartdate(event.target.value);
  };

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `http://localhost:5000/Event/addevent`;

    const formData = new FormData();
    formData.append("imagePath", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("creator", creator);
    formData.append("location", place);
    formData.append("category", category);
    formData.append("startDate", date);
    formData.append("moreInfo", phone);
    formData.append("user", id);
    formData.append("status", "Approved");

    try {
      const response = await axios.post(URL, formData);
      if (response.status === 200) {
        Swal.fire("success", JSON.stringify(response.data.message), "success");
      } else {
        window.alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      window.alert("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                  Add a new Event
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          placeholder="Event Title"
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />{" "}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Creator</label>
                        <Input
                          placeholder="Creator name"
                          type="text"
                          required
                          value={creator}
                          onChange={(e) => setCreator(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          placeholder="Event Synopsis"
                          type="textarea"
                          rows="4"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />{" "}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>category</label>
                        <Select
                          options={Categorys}
                          onChange={handleCategoryChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Type</label>
                        <Select
                          options={Locations}
                          onChange={handleLocationChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {place === "Hybride" || place === "Onsite" ? (
                      <Col md="6">
                        <label>Address</label>
                        <Input
                          placeholder="Address"
                          type="text"
                          value={address}
                          onChange={(e) => {
                            handleAddressChange(e);
                          }}
                        />
                      </Col>
                    ) : null}
                  </Row>

                  <Row>
                    <Col md="6" className="form-group">
                      <label>Start date</label>
                      <input
                        type="date"
                        className="form-control"
                        onChange={handleDateChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="form-group">
                      <label>Poster</label>
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => setPicture(e.target.files[0])}
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="form-group">
                      <label>More Info</label>
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setPhone}
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Col className="ml-auto mr-auto">
                    <Button type="submit" className="btn-fill">
                      Submit
                    </Button>
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddEvent;
