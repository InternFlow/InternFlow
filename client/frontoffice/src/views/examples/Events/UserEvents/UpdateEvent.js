import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function UpdateEvent(props) {
  const show = props.show;
  const [startDate, setStartDate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    deliveryOption: "",
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal show={show} onHide={props.onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasictitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCreator">
            <Form.Label>Creator</Form.Label>
            <Form.Control type="text" placeholder="created by" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="description" />
          </Form.Group>
          <Form.Group controlId="formBasicDeliveryOption">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleInputChange}
            >
              <option value="Remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </Form.Control>
          </Form.Group>

          {formData.deliveryOption === "hybrid" ||
          formData.deliveryOption === "onsite" ? (
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>

            <Form.Control
              as="select"
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleInputChange}
            >
              <option value="SPORTS">Sports</option>
              <option value="BUSINESS">Business</option>
              <option value="POLITICAL">Political</option>
              <option value="TECHNOLOGY">Technology</option>
              <option value="DESIGN">Design</option>
              <option value="MARKETING">Marketing</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select a date"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}
