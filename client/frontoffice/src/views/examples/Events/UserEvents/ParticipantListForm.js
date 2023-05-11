import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

function ParticipantListForm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const list = props.eventdata.participants;
  return (
    <>
      <button
        type="button"
        className="edit-btn fs-13  fw-6"
        onClick={handleShow}
      >
        <span>
          <FontAwesomeIcon icon={faList} />
        </span>
        Participant
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Participant List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ParticipantListForm;
