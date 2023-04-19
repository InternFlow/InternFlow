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
import OffreCompany from "views/examples/OfferCompany";
import QuestionsQuiz from "views/examples/QuestionsQuiz";
import CondidatQuestions from "views/examples/CondidatQuestions";

import InterviewCompany from "views/examples/InterviewCompany";


import RegisterPage from "views/examples/RegisterPage.js";
import Login from "views/examples/Login.js";
import NewPass from "views/examples/NewPass";
import NewPassEmail from "views/examples/NewPassEmail";
import Editcompany from "views/examples/EditCompanyProfile";
import Condidatquizzes from "views/examples/Condidatquizzes";

import ApplicationCondidate from "views/examples/Applicationcondidate";

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
        path="/offres"
        render={(props) => <QuestionsQuiz {...props} />}
      />
    
    <Route
        path="/offer/condidat/questions"
        render={(props) => <CondidatQuestions {...props} />}
      />

<Route
        path="/quizzes/offres/condidat"
        render={(props) => <Condidatquizzes {...props} />}
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
        path="/sign-up-Trainer"
        render={(props) => <RegisterTrainerPage {...props} />}
      />

<Route
        path="/stagescompany"
        render={(props) => <OffreCompany {...props} />}
      />

<Route
        path="/stagescompanyapplication"
        render={(props) => <ApplicationCondidate {...props} />}
      />



<Route
        path="/InterviewCompany"
        render={(props) => <InterviewCompany {...props} />}
      />

    <Redirect to="/index" />




    </Switch>
  </BrowserRouter>
);
