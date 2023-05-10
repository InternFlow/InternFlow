import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";

function GetSession() {
  const history = useHistory();

  async function getToken() {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    localStorage.setItem("token", token);
    document.cookie = `jwt=${token}; max-age=86400*100; path=/`;
  }

  async function getUserDetails() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.user);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("id", data.user._id);
        })
        .catch((error) => console.error(error));
    }
  }

  React.useEffect(() => {
    getToken();
    getUserDetails();
    history.push("/admin/dashboard");
  }, []);

  return <></>;
}

export default GetSession;
