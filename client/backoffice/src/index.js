import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import GetSession from "views/GetSession";
import ResetPassword from "views/resetPassword";
import ApplyPage from "views/candidacies/ApplyPage";
import EventPage from "views/Events/EventPage";
const root = ReactDOM.createRoot(document.getElementById("root"));

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
        console.log("user data: ", data.user);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("id", data.user._id);
      })
      .catch((error) => console.error(error));
  }
}

root.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/admin/get-sesstion"
        render={(props) => <GetSession {...props} />}
      />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/forgotPassword" component={ResetPassword} />
      <Route path="/showApply" component={ApplyPage} />
      <Redirect to="/admin" />
    </Switch>
  </BrowserRouter>
);
