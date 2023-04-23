import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div id="mainheader">
        <div
          className="page-header section-dark"
          style={{
            backgroundImage:
              "url(" + require("assets/img/internship2.jpg") + ")",
          }}
        >
          <div className="filter" />
          <div className="content-center">
            <Container>
              <div className="title-brand">
                <h1 className="presentation-title">InternFlow</h1>
              </div>
              <h2 className="presentation-subtitle text-center">
                The First Plateform of Internships in Tunisia
              </h2>
            </Container>
          </div>
          <div
            className="moving-clouds"
            style={{
              backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
