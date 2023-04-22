import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import UserEvents from "./UserEvents";
import "./UserEvents.css";

const UserEventsList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/Event/allEvents");
      setData(response.data);
    };
    fetchProducts();
  }, []);

  const handleDeleteEvent = async (id) => {
    await axios.delete(`http://localhost:5000/Event/deleteevent/${id}`);
    setData(data.filter((event) => event._id !== id));
  };

  return (
    <CartWrapper>
      <div className="container">
        <div className="cart-pg-title">
          <h3>My events</h3>
        </div>
        <div className="cart-grid grid">
          <div className="cart-items-list grid">
            {data.map((event) => (
              <UserEvents
                key={event._id}
                data={event}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        </div>
      </div>
    </CartWrapper>
  );
};

const CartWrapper = styled.div`
  padding: 30px 0;
  .card-pg-title {
    padding: 20px 0 6px 0;
  }
  .cart-grid {
    row-gap: 40px;
    .cart-grid-left {
      margin-bottom: 30px;
    }

    .cart-clear-btn {
      span {
        margin-left: 6px;
      }
    }

    .cart-items-list {
      margin-top: 20px;
      row-gap: 12px;
    }
    .cart-total-value {
      font-size: 34px;
    }
    .checkout-btn {
      padding: 14px 28px;
      letter-spacing: 1px;
      margin-top: 12px;
      transition: var(--transition);

      &:hover {
        background-color: var(--clr-dark);
      }
    }
    .cart-total {
      padding-bottom: 50px;
    }

    @media screen and (min-width: 992px) {
      grid-template-columns: 70% 30%;
      column-gap: 32px;
    }
  }
`;

export default UserEventsList;
