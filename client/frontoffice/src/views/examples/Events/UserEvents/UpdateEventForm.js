import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { TiEdit } from "react-icons/ti";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import { Row, Col, Input } from "reactstrap";

function UpdateEventForm(props) {
  const { updateEvent } = props;
  const id = props.eventdata._id;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //add event
  const [title, setTitle] = useState(props.eventdata.title);
  const [creator, setCreator] = useState(props.eventdata.creator);
  const [description, setDescription] = useState(props.eventdata.description);
  const [place, setLocation] = useState(props.eventdata.place);
  const [address, setAddress] = useState(props.eventdata.address);
  const [category, setCategory] = useState(props.eventdata.category);
  const [date, setStartdate] = useState(props.eventdata.startDate);
  const [phone, setPhone] = useState(props.eventdata.moreInfo);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      title: title,
      description: description,
      creator: creator,
      location: place,
      category: category,
      address: address,
      startdate: date,
      moreInfo: phone,
    };

    updateEvent(id, updatedEvent);
  };

  return (
    <>
      <button
        type="button"
        className="edit-btn fs-13  fw-6"
        onClick={handleShow}
      >
        Edit
        <span>
          <TiEdit />
        </span>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              <Col className="ml-auto mr-auto"></Col>
            </Row>
            <Button type="submit" className="btn-fill">
              Save changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEventForm;
