import React from "react";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import Projectintro from "./Projectintro";
import Teamintro from "./Teamintro";
import Contactus from "./Contactus";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <IndexNavbar />
      <LandingPageHeader />
      <div className="main">
        <div className="section text-center">
          <Projectintro />
        </div>
        <div className="section section-dark text-center">
          <Teamintro />
        </div>
        <div className="section landing-section">
          <Contactus />
        </div>
      </div>
      <DemoFooter />
    </>
  );
}

export default LandingPage;