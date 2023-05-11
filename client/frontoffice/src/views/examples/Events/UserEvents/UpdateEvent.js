import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";

export default function UpdateEvent(props) {
  const show = props.show;
  const id = props.eventid;
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [place, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption.value);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `http://localhost:5000/Event/updateevent/${id}`;

    const data = {
      title: title,
      description: description,
      creator: creator,
      location: place,
      category: category,
    };

    // send the update object to the API endpoint
    fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedEvent) => {
        Swal.fire("Good job!", "Event updated", "success");
        // do something with the updated event, e.g. update the UI
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <Modal show={show} onHide={props.onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} method="PATCH">
          <Form.Group className="mb-3" controlId="formBasictitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCreator">
            <Form.Label>Creator</Form.Label>
            <Form.Control
              type="text"
              placeholder="created by"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDeliveryOption">
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" onChange={handleLocationChange}>
              <option value="Remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>

            <Form.Control as="select" onChange={handleCategoryChange}>
              <option value="SPORTS">Sports</option>
              <option value="BUSINESS">Business</option>
              <option value="POLITICAL">Political</option>
              <option value="TECHNOLOGY">Technology</option>
              <option value="DESIGN">Design</option>
              <option value="MARKETING">Marketing</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
