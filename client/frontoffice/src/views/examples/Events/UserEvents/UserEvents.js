import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashAlt } from "react-icons/fa";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import ParticipantListForm from "./ParticipantListForm";

import UpdateEventForm from "./UpdateEventForm";

const UserEvents = (props) => {
  const { onDelete } = props;
  const { updateEvent } = props;
  const data = props.data;
  const formattedDate = new Date(data.startDate).toLocaleDateString();

  // Delete Function
  const handleDeleteChange = async (event, id) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onDelete(id);
        Swal.fire("Deleted!", "Your Event has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <Eventstyle>
        <Card>
          <Card.Img
            variant="top"
            src={`http://localhost:5000/uploadImage/images/${data.imagePath}`}
            alt={data.title}
          />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>created by {data.creator}</span>
            </Card.Subtitle>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>{data.description}</span>
            </Card.Subtitle>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>{data.category}</span>
            </Card.Subtitle>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>{data.location}</span>
            </Card.Subtitle>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span style={{ marginRight: "5px" }}>
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              {data.adress}
            </Card.Subtitle>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span style={{ marginRight: "5px" }}>
                <FontAwesomeIcon icon={faPhone} />
              </span>
              {data.moreInfo}
            </Card.Subtitle>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span style={{ marginRight: "5px" }}>
                <FontAwesomeIcon icon={faCalendarDays} />
              </span>
              {formattedDate}
            </Card.Subtitle>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>Status {data.status}</span>
            </Card.Subtitle>
            <button
              type="button"
              className="remove-btn fs-13  fw-6"
              onClick={(event) => handleDeleteChange(event, data._id)}
            >
              Remove{" "}
              <span>
                <FaTrashAlt />
              </span>
            </button>
            <UpdateEventForm eventdata={props.data} updateEvent={updateEvent} />
            <ParticipantListForm eventdata={props.data} />
          </Card.Body>
        </Card>
      </Eventstyle>
    </>
  );
};

const Eventstyle = styled.div`
  width: 30%;
  margin: 10px;

  @media (max-width: 771px) {
    width: 100%;
  }

  .remove-btn {
    margin-top: 16px;
    transition: var(--transition);
    &:hover {
      color: red;
    }
  }

  .edit-btn {
    margin-top: 16px;
    margin-left: 50px;
    transition: var(--transition);
    &:hover {
      color: var(--clr-purple);
    }
 

    `;
export default UserEvents;
