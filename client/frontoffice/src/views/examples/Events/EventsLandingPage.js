import React from "react";
import "./Events.css";
import AddEvent from "./AddEvent";
import UserEventsList from "./UserEvents/UserEventsList";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
const EventLandingPage = () => {
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <AddEvent />
      <UserEventsList />
    </>
  );
};

export default EventLandingPage;
