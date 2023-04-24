import "./Events.css";
import React from "react";
import styled from "styled-components";
import Tabs from "./Tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Events.css";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import CondidatNavbar from "components/Navbars/CondidatNavbar";
const EventsList = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/Event/allEvents");
      setData(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
<CondidatNavbar/>      <ProfilePageHeader />
      <EventsListWrapper>
        <div className="container">
          <div className="Events-list-top">
            <h2>Events</h2>
            <p>Grow your social circule & Gain New Experience</p>
          </div>

          <Tabs events={data} />
        </div>
      </EventsListWrapper>
    </>
  );
};

const EventsListWrapper = styled.div`
  padding: 40px 0;
  .Events-list-top p {
    font-size: 1.8rem;
  }
`;

export default EventsList;
