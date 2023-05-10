import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormateurProfilePage from "./FormateurProfile";
import CompanyProfilePage from "./CompanyProfile";
import ProfilePage from "./ProfilePage";
import EditFormateurProfile from "./EditFormateurProfile";
import EditCompanyProfile from "./EditCompanyProfile";
import EditCondidatProfile from "./EditCondidatProfile";
import CondidatNavbar from "components/Navbars/CompanyNavbar";

export default function ProfileView() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [userById, setUserById] = useState();
  const { id } = useParams();
  const fetchLoggedInUser = async () => {
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
          const userData = data.user;
          setLoggedInUser({ ...userData });
        })
        .catch((error) => console.error(error));
    }
  };

  const fetchUserById = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/profile/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const userData = data.user;
          setUserById({ ...userData });
        })
        .catch((error) => console.error(error));
    }
  };

  React.useEffect(() => {
    fetchLoggedInUser();
    const bool =
      loggedInUser &&
      (loggedInUser._id === id || !id) &&
      loggedInUser.role === "condidat";
    console.log(bool);
    fetchUserById();
  }, []);

  return (
    <div>
      {loggedInUser && (
        <>
          {loggedInUser._id === id || !id ? (
            <>
              {loggedInUser.role === "formateur" && (
                <div>
                  <EditFormateurProfile />
                </div>
              )}
              {loggedInUser.role === "company" && (
                <div>
                  <EditCompanyProfile />
                </div>
              )}
              {loggedInUser.role === "condidat" && (
                <div>
                  <EditCondidatProfile />
                </div>
              )}
            </>
          ) : (
            <>
              {userById && (
                <>
                  {userById.role === "formateur" && (
                    <div>
                      <FormateurProfilePage userId={id} />
                    </div>
                  )}
                  {userById.role === "company" && (
                    <div>
                      <CompanyProfilePage userId={id} />
                    </div>
                  )}
                  {userById.role === "condidat" && (
                    <div>
                      <ProfilePage userId={id} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
