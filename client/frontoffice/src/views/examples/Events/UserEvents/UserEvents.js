import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { useState } from "react";
import "./UserEvents.css";
import UpdateEvent from "./UpdateEvent";

const UserEvents = ({ data, onDelete }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Delete Function
  const handleDeleteChange = async (event, id) => {
    event.preventDefault();
    await onDelete(id);
  };

  return (
    <>
      <UpdateEvent
        eventolddata={data}
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
          <div className="fw-6 ">{data.moreinfo}</div>
          <div className="fw-6 ">{data.date}</div>
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
            Edit{" "}
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
