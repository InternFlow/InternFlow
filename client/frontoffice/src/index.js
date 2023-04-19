/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LinkedInLogin from "views/examples/LinkedInLogin";
import RegisterCompanyPage from "views/examples/RegisterCompanyPage.js";
// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import RegisterTrainerPage from "views/examples/RegisterTrainerPage";
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import FormateurProfile from "views/examples/FormateurProfile.js";
import CompanyProfile from "views/examples/CompanyProfile.js";
import Editcondidat from "views/examples/EditCondidatProfile";

import ListeCandidacies from "views/examples/ListeCandidacies";

import RegisterPage from "views/examples/RegisterPage.js";
import Login from "views/examples/Login.js";
import NewPass from "views/examples/NewPass";
import NewPassEmail from "views/examples/NewPassEmail";
import Editcompany from "views/examples/EditCompanyProfile";
import OfferPage from "views/examples/OfferPage";
import ApplyPage from "views/examples/ApplyPage";
import AllOffers from "views/examples/AllOffers";
import OfferDetails from "views/examples/OfferDetails";
import ListCAndidiesIntern from "views/examples/ListCandidaciesIntern";
import AddOffer from "views/examples/AddOffer";
import EditOffer from "views/examples/EditOffer";
import ListCAndidiesOffer from "views/examples/ListCandidaciesOffer";
import ApplyPageOffer from "views/examples/ApplyPageOffer";

// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/sign-up"
        render={(props) => <RegisterPage {...props} />}
      />
       <Route
        path="/sign-in"
        render={(props) => <Login {...props} />}
      />
      <Route
        path="/new-password"
        render={(props) => <NewPass {...props} />}
      />
      <Route
        path="/new-passwordEmail"
        render={(props) => <NewPassEmail {...props} />}
      />

<Route
        path="/linkedIn"
        render={(props) => <LinkedInLogin {...props} />}
      />

      <Route
        path="/profile-formateur-page"
        render={(props) => <FormateurProfile {...props} />}
      />


<Route
        path="/profile-company-page"
        render={(props) => <CompanyProfile {...props} />}
      />

<Route
        path="/Edit-condidat-page"
        render={(props) => <Editcondidat {...props} />}
      />

<Route
        path="/Edit-company-page"
        render={(props) => <Editcompany {...props} />}
      />


<Route
        path="/sign-up-Company"
        render={(props) => <RegisterCompanyPage {...props} />}
      />


<Route
        path="/liste-candidacies"
        render={(props) => <ListeCandidacies {...props} />}
      />
<Route
        path="/sign-up-Trainer"
        render={(props) => <RegisterTrainerPage {...props} />}
      />

<Route
        path="/offer"
        render={(props) => <OfferPage {...props} />}
      />
<Route
        path="/showApply"
        render={(props) => <ApplyPage {...props} />}
      />

<Route
        path="/AllOffers"
        render={(props) => <AllOffers {...props} />}
      />
      
<Route
        path="/DetailsOffers/:id"
        render={(props) => <OfferDetails {...props} />}
      />
 
 <Route
        path="/ListCandidaciesIntern"
        render={(props) => <ListCAndidiesIntern {...props} />}
      />
      
<Route
        path="/AddOfferCompany"
        render={(props) => <AddOffer {...props} />}
      />
<Route
        path="/EditOfferCompany"
       render={(props) => <EditOffer {...props} />}
      />
       
 <Route
        path="/ListCandidaciesOffer/:id"
        render={(props) => <ListCAndidiesOffer {...props} />}
      />
      <Route
        path="/ApplyPageOffer/:idC"
        render={(props) => <ApplyPageOffer {...props} />}
      />
      
    <Redirect to="/index" />




    </Switch>
  </BrowserRouter>
);
