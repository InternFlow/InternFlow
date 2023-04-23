import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import axios from "axios";
import "./Events.css";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";

// reactstrap components
import { Button, Form, Input, Container, Row, Col } from "reactstrap";
function AddEvent() {
  //add event
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [date, setStartdate] = useState("");
  const [phone, setPhone] = useState("");
  const [imageBase64, setBase64] = useState("");

  function fileBrowseHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      setBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `http://localhost:5000/Event/addevent`;

    const data = {
      title: title,
      description: description,
      creator: creator,
      location: location,
      address: address,
      category: category,
      startDate: date,
      moreInfo: phone,
      imageBase64: imageBase64,
    };
    console.log(data);
    try {
      const response = await axios.post(URL, data);
      if (response.status === 200) {
        window.alert(JSON.stringify(response.data));
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
      <ExamplesNavbar />
      <ProfilePageHeader />
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
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
                {location === "Hybride" || location === "Onsite" ? (
                  <Col>
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
                    onChange={fileBrowseHandler}
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
