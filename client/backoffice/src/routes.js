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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import SignUp from "views/SignUp";
import ViewUsers from "views/users/viewUsers";
import CreateUsers from "views/users/createUsers";
import EditUser from "views/users/editUser";
import EditProfileUser from "views/users/EditProfileUser";
import candidaciesList from "views/candidacies/candidaciesList";
import ApplyPage from "views/candidacies/ApplyPage";
import CreateOffer from "views/offers/createOffer";
import ViewOffers from "views/offers/viewOffer";
import EditOffer from "views/offers/editOffer";
import AddEvent from "views/Events/AddEvent";
import EventPage from "views/Events/EventPage";
import ConsultEvents from "views/Events/ConsultEvents";
import ViewCourses from "views/courses/ViewCourses";
import AddCourse from "views/courses/AddCourse";
import EditCourse from "views/courses/EditCourse";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  {
    path: "/createUser",
    name: "Add A new User",
    icon: "nc-icon nc-simple-add",
    component: CreateUsers,
    layout: "/admin",
  },
  {
    path: "/viewUser",
    name: "Display Users",
    icon: "nc-icon nc-laptop",
    component: ViewUsers,
    layout: "/admin",
  },
  {
    path: "/viewCourses",
    name: "Display Courses",
    icon: "nc-icon nc-laptop",
    component: ViewCourses,
    layout: "/admin"
  },
  {
    path: "/createCourse",
    name: "Add A new Course",
    icon: "nc-icon nc-simple-add",
    component: AddCourse,
    layout: "/admin"
  },
  {
    path: "/candidaciesList",
    name: "candidacies List",
    icon: "nc-icon nc-laptop",
    component: candidaciesList,
    layout: "/admin",
  },
  {
    path: "/editUser",
    component: EditUser,
    layout: "/admin",
  },
  {
    path: "/editProfileCondidat",
    component: EditProfileUser,
    layout: "/admin",
  },
  {
    path: "/showApply",
    component: ApplyPage,
    layout: "/admin",
  },
  {
    path: "/createOffer",
    name: "Add A new Offer",
    icon: "nc-icon nc-simple-add",
    component: CreateOffer,
    layout: "/admin",
  },

  {
    path: "/editOffer",
    component: EditOffer,
    layout: "/admin",
  },
  {
    path: "/viewOffer",
    name: "Display Offers",
    icon: "nc-icon nc-laptop",
    component: ViewOffers,
    layout: "/admin",
  },

  {
    path: "/editUser",
    component: EditUser,
    layout: "/admin",
  },
  {
    path: "/editProfileCondidat",
    component: EditProfileUser,
    layout: "/admin",
  },
  {
    path: "/addEvent",
    component: AddEvent,
    layout: "/admin",
  },
  {
    path: "/eventPage",
    component: EventPage,
    layout: "/admin",
  },

  {
    path: "/consultevents",
    component: ConsultEvents,
    layout: "/admin",
  },

  {
    path: "/editCourse",
    name: "Edit A Course",
    component: EditCourse,
    layout: "/admin"
  },

];
export default routes;
