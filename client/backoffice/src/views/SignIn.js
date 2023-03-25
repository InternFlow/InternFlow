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
import { API } from "../config";
import React, { useState } from "react";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  FormFeedback ,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import signin from "../assets/img/signin.jpg";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";




function SignIn() {

  window.location.replace('http://localhost:3000/index');

}

export default SignIn;
