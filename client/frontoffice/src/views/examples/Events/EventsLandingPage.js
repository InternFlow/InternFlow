import React from "react";
import "./Events.css";
import AddEvent from "./AddEvent";
import EventsList from "./EventsList";
import UserEventsList from "./UserEvents/UserEventsList";

const EventLandingPage = () => {
  return (
    <>
      <AddEvent />
      <EventsList />
      <UserEventsList />
    </>
  );
};

export default EventLandingPage;
