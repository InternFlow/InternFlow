import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";

function ParticipatInfo(props) {
  const eventId = props.eventinfo._id;
  const [name, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [UserData, setUser] = useState("");
  const userId = localStorage.getItem("id");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name === UserData.name &&
      lastName === UserData.lastName &&
      email === UserData.email
    ) {
      try {
        await axios.post(
          `http://localhost:5000/Event/addparticipant/${eventId}`,
          {
            name,
            lastName,
            email,
          }
        );
        Swal.fire("Good job!", "Invitation sent", "success");
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Check your Info",
      });
    }
  };

  return (
    <>
      <button className="item-btn add-to-cart-btn" on onClick={handleShow}>
        Participate
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="your Name"
                value={name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="your LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
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

export default ParticipatInfo;
