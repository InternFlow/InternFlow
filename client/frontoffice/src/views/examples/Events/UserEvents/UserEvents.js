import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { useState } from "react";
import "./UserEvents.css";
import UpdateEvent from "./UpdateEvent";
import Swal from "sweetalert2";

const UserEvents = ({ data, onDelete }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      <UpdateEvent
        eventid={data._id}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      />
      <CartItemWrapper className="grid">
        <div className="cart-item-img">
          <img src={data.imagePath} alt="" />
        </div>
        <div className="cart-item-info">
          <p className="fw-7 fs-15">{data.title}</p>
          <span className="cart-item-creator fs-13 opacity-09">
            By {data.creator}
          </span>
          <div className="fw-6 ">{data.description}</div>
          <div className="fw-7 text-purple">{data.location}</div>
          <div className="fw-6 ">{data.category}</div>
          <div className="fw-6 ">{data.adress}</div>
          <div className="fw-6 ">{data.moreInfo}</div>
          <div className="fw-6 ">{formattedDate}</div>
          <br />
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
        </div>
      </CartItemWrapper>
    </>
  );
};

const CartItemWrapper = styled.div`
  grid-template-columns: 110px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;

  .descr{
  
      wordWrap: "break-word";
  
  }

  .cart-item-img {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cart-item-info {
    margin-left:150px;
    padding: 0px 10px;
    border-radius: 6px;
  }
  .remove-btn {
    margin-top: 16px;
    transition: var(--transition);
    &:hover {
      color: var(--clr-purple);
    }
  }
  .edit-btn {
    margin-top: 16px;
    margin-left:50px;
    transition: var(--transition);
    &:hover {
      color: var(--clr-purple);
    }
`;

export default UserEvents;
