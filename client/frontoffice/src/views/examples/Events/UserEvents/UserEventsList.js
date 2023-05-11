import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import UserEvents from "./UserEvents";
import CondidatNavbar from "components/Navbars/CompanyNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import { useLocation } from "react-router-dom";

const UserEventsList = () => {
  //get formateur id
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userid = JSON.parse(searchParams.get("data"));

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `http://localhost:5000/Event/UserEvents/${userid}`
      );
      setData(response.data);
    };
    fetchProducts();
  }, [userid]);

  const handleDeleteEvent = async (eventid) => {
    await axios.delete(`http://localhost:5000/Event/deleteevent/${eventid}`);
    setData(data.filter((event) => event._id !== eventid));
  };

  const fetchEvents = async () => {
    const response = await axios.get(
      `http://localhost:5000/Event/UserEvents/${userid}`
    );
    setData(response.data);
  };

  async function updateEvent(eventid, updatedEvent) {
    axios
      .put(`http://localhost:5000/Event/updateevent/${eventid}`, updatedEvent)

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    await fetchEvents();
  }

  return (
    <>
      {" "}
      <CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />
      <div className="container">
        <div className="cart-grid grid">
          <h3>My events</h3>
          <EventsListContainer>
            {data.map((event) => (
              <UserEvents
                key={event._id}
                data={event}
                onDelete={handleDeleteEvent}
                updateEvent={updateEvent}
              />
            ))}
          </EventsListContainer>
        </div>
      </div>
    </>
  );
};

const EventsListContainer = styled.div`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 771px) {
    width: 58%;
    padding: 0;
  }
`;

export default UserEventsList;
