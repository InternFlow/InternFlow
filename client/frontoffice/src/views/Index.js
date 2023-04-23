import React from "react";

import LandingPage from "./examples/LandingPage";

function Index() {
  // const token = localStorage.getItem("token"); // récupère le token JWT depuis le navigateur web

  // document.documentElement.classList.remove("nav-open");
  // React.useEffect(() => {
  //   document.body.classList.add("index");
  //   return function cleanup() {
  //     document.body.classList.remove("index");
  //   };
  // });
  return (
    <div className="main">
      <LandingPage />
    </div>
  );
}

export default Index;
