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
import CreateUser from "views/users/createUsers";
import EditUser from "views/users/editUser";
import CreateSkill from "views/skills/createSkill";
import ViewSkills from "views/skills/viewSkills";
import EditSkill from "views/skills/editSkill";
import CreateExperience from "views/experience/createExp";
import ViewExperience from "views/experience/viewExp";
import EditExp from "views/experience/editExp";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  
  {
    path: "/createUser",
    name: "Add A new User",
    icon: "nc-icon nc-simple-add",
    component: CreateUser,
    layout: "/admin"
  },
  {
    path: "/createSkill",
    name: "Add A new Skill",
    icon: "nc-icon nc-simple-add",
    component: CreateSkill,
    layout: "/admin"
  },
  {
    path: "/createExp",
    name: "Add A new Experience",
    icon: "nc-icon nc-simple-add",
    component: CreateExperience,
    layout: "/admin"
  },
  {
    path: "/editUser",
    name: "Edit A User",
    icon: "nc-icon nc-settings",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/editSkill",
    name: "Edit A Skill",
    icon: "nc-icon nc-settings",
    component: EditSkill,
    layout: "/admin"
  },
  {
    path: "/editExp",
    name: "Edit An Experience",
    icon: "nc-icon nc-settings",
    component: EditExp,
    layout: "/admin"
  },
  {
    path: "/viewUser",
    name: "Display Users",
    icon: "nc-icon nc-laptop",
    component: ViewUsers,
    layout: "/admin"
  },
  {
    path: "/viewSkill",
    name: "Display Skills",
    icon: "nc-icon nc-laptop",
    component: ViewSkills,
    layout: "/admin"
  },
  {
    path: "/viewExp",
    name: "Display Experiences",
    icon: "nc-icon nc-laptop",
    component: ViewExperience,
    layout: "/admin"
  }

];
export default routes;
