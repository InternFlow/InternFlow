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

import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";





function GetSession() {
const history = useHistory();

    async function getToken(){
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        localStorage.setItem("token", token);
        document.cookie = `jwt=${token}; max-age=86400*100; path=/`;
    }

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
                console.log(data.user);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("id", data.user._id);
            })
            .catch(error => console.error(error));
        }
      }


    React.useEffect(()=>{
        getToken();
        getUserDetails();
        history.push("/admin/dashboard")
    },[])

  return (
    <>
    
    </>
  );
}

export default GetSession;
