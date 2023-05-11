import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import axios from "axios";
import "./Events.css";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import CondidatNavbar from "components/Navbars/CompanyNavbar";

// reactstrap components
import { Button, Form, Input, Container, Row, Col } from "reactstrap";

function AddEvent() {
  //get formateur id
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = JSON.parse(searchParams.get("data"));

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
    formData.append("status", "Pending");

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
    <div id="AddEvent">
      <CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="6">
            <h2 className="text-center">Add Event</h2>
            <Form
              className="contact-form"
              onSubmit={handleSubmit}
              method="POST"
            >
              <Row>
                <Col md="6">
                  <label>Title</label>

                  <Input
                    placeholder="Event Title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
                <Col md="6">
                  <label>Creator</label>

                  <Input
                    placeholder="Creator name"
                    type="text"
                    required
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                  />
                </Col>
              </Row>
              <label>Description</label>
              <Input
                placeholder="Event Synopsis"
                type="textarea"
                rows="4"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />{" "}
              <Row>
                <Col md="6">
                  <label>Category</label>
                  <Select options={Categorys} onChange={handleCategoryChange} />
                </Col>
                <Col md="6">
                  <label>Type</label>
                  <Select options={Locations} onChange={handleLocationChange} />
                </Col>
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
              <Row>
                <Col className="ml-auto mr-auto">
                  <Button type="submit" className="btn-fill">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddEvent;
