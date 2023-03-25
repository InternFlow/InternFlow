/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import SignUp from "views/SignUp";
import GetSession from "views/GetSession";
import Dashboard from "layouts/Admin";
import ResetPassword from "views/resetPassword";
import SignIn from "views/SignIn";
const root = ReactDOM.createRoot(document.getElementById("root"));


async function getUserDetails(){

  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'

    })
      .then(response => response.json())
      .then(data => {
          console.log("user data: ",data.user);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("id", data.user._id);
      })
      .catch(error => console.error(error));
  }
}



root.render(
  <BrowserRouter>
    <Switch>
    <Route path="/signin" render={(props) => <SignIn {...props} />} />

      <Route path="/admin/get-sesstion" render={(props) => <GetSession {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/forgotPassword" component={ResetPassword} />


      <Redirect to="/signin" />

      {/* <Redirect to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>
);
