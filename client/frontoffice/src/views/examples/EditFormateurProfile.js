import { API } from "../../config";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Accordion from "components/Accordion";
import { BsPencilSquare, BsPlusCircle } from "react-icons/bs";
import { PlusCircleFill } from "react-bootstrap-icons";
import moment from "moment";
import MyCourseListItem from "components/TrainerComponents/MyCourseListItem";
import UpdateCourseForm from "components/TrainerComponents/UpdateCourseForm";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Container,
  Col,
  CardText,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardGroup,
} from "reactstrap";
import AddCourseForm from "components/TrainerComponents/AddCourseForm";
import ImageUpload from "./ImageUpload";
import CondidatNavbar from "components/Navbars/CondidatNavbar";
function EditFormateurProfile() {
  const [userd, setUserData] = useState({
    name: "",
    email: "",
    occupation: "",
    pfpPath:
      "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",
    local: [],
    description: "",
  });

  const [isPfpModal, setIsPfpModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseU, setCourseU] = useState();
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/Course/trainer", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [isDetailsModal, setIsDetailsModal] = useState(false);
  const [isBioModal, setIsBioModal] = useState(false);
  const [isUpdateCourseModal, setIsUpdateCourseModal] = useState(false);
  const [isAddCourseModal, setIsAddCourseModal] = useState(false);
  const [updatedUserd, setUpdatedUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    occupation: "",
    pfpPath:
      "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",

    local: [],
    description: "",
  });

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/Course/${id}`, {
        method: "DELETE",

        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const deleted = await response.json();
      return deleted;
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCourse = (course) => {
    setCourseU({ ...course });
    setIsUpdateCourseModal(true);
  };
  const handleAddCourse = (course) => {
    setIsAddCourseModal(true);
  };

  const handleDeleteCourse = (course) => {
    // Send a DELETE request to delete the course
    deleteCourse(course._id)
      .then((res) => {
        console.log("Course deleted successfully:", res);
        // Navigate to the course list page or do something else
        fetchCourses();
      })
      .catch((err) => console.error("Error deleting course:", err));
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userd),
        credentials: "include",
      };

      const response = await fetch(
        `${API}/Condidat/editprofile`,
        requestOptions
      );
      setUserData(await response.json().user);
      //   onUpdate(data.user);
      history.push("/profile-page");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const detailsModal = () => {
    setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
    setIsDetailsModal(true);
  };

  const bioModal = () => {
    setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
    setIsBioModal(true);
  };

  const submitDetails = async () => {
    try {
      await saveUser(updatedUserd);
      setIsDetailsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBio = () => {
    setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
    setIsBioModal(false);
  };

  const submitBio = async () => {
    await saveUser(updatedUserd);
    setIsBioModal(false);
  };

  const cancelDetails = () => {
    setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
    setIsDetailsModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserData((prevUserData) => {
      // Create a copy of the previous state to modify
      const newUserData = { ...prevUserData };

      // Handle changes to scalar attributes
      if (
        name !== "educations" &&
        name !== "experiences" &&
        name !== "skills" &&
        name !== "local"
      ) {
        newUserData[name] = value;
      }
      // Handle changes to educations or experiences list
      else if (name === "educations" || name === "experiences") {
        const index = event.target.getAttribute("data-index");
        const field = event.target.getAttribute("data-field");
        newUserData[name][index][field] = value;
      }
      // Handle changes to skills or local list
      else {
        const index = event.target.getAttribute("data-index");

        newUserData[name][index] = value;
      }

      // Return the modified state
      return newUserData;
    });
  };

  async function saveUser(user) {
    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      };

      await fetch(`${API}/Condidat/editmyprofile`, requestOptions);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfile() {
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
          const updatedUser = { ...userd, ...data.user };
          setUserData(updatedUser);
          setUpdatedUserData(JSON.parse(JSON.stringify(updatedUser)));
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    getProfile();
    fetchCourses();
  }, []);

  return (
    <>
      <CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={userd.pfpPath}
                onClick={() => setIsPfpModal(true)}
              />
              {isPfpModal && (
                <ImageUpload
                  onImageUpload={getProfile}
                  isOpen={isPfpModal}
                  toggle={() => setIsPfpModal(!isPfpModal)}
                  url={userd.pfpPath}
                />
              )}
            </div>
            <Row>
              <Col md="4">
                <Card className="text-center text-md-left">
                  <CardHeader>
                    <CardTitle
                      tag="h5"
                      style={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      {userd.name} {userd.lastName}
                      <BsPencilSquare
                        fontSize={30}
                        className="pencil-icon"
                        color="primary"
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "15px",
                        }}
                        onClick={detailsModal}
                      />
                    </CardTitle>
                    <div style={{ fontSize: 18 }}> {userd.occupation}</div>
                  </CardHeader>
                  <CardBody>
                    <ListGroup flush>
                      <ListGroupItem className="justify-content-between">
                        Locations :
                        <ul className="description">
                          {userd.local.map((local, index) => {
                            return (
                              <>
                                <li>{local}</li>
                              </>
                            );
                          })}
                        </ul>
                      </ListGroupItem>
                      <ListGroupItem className="justify-content-between">
                        Contact :<h6 className="description">{userd.email} </h6>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <Card className="text-center text-md-left">
                  <CardHeader>About:</CardHeader>
                  <CardBody style={{ padding: "18p" }}>
                    <div>
                      <h5 className="text-uppercase" style={{ fontSize: 14 }}>
                        Bio:{" "}
                        <BsPencilSquare
                          fontSize={30}
                          className="pencil-icon"
                          color="primary"
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "15",
                          }}
                          onClick={bioModal}
                        />
                      </h5>
                    </div>
                    <p>{userd.description}</p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="2">
                <Row>
                  <Link
                    to={{
                      pathname: "/AddEvent",
                      search: `?data=${JSON.stringify(userd._id)}`,
                    }}
                  >
                    <button className="btn-round btn btn-success btn-block">
                      Add Event
                    </button>
                  </Link>
                </Row>
                <Row>
                  <Link
                    to={{
                      pathname: "/EventStatus",
                      search: `?data=${JSON.stringify(userd._id)}`,
                    }}
                  >
                    <button className="btn-round btn btn-success btn-block">
                      My Events
                    </button>
                  </Link>
                </Row>
              </Col>
            </Row>
            <Row>
              {courses === [] || !courses ? (
                <Row>
                  <h2>Nothing Here Yet!</h2>
                </Row>
              ) : (
                <Row>
                  <CardGroup>
                    {courses.map((course, Index) => (
                      <MyCourseListItem
                        key={course._id}
                        course={course}
                        searchTerm={""}
                        onCourseNameClick={() => {
                          console.log("name clicked");
                        }}
                        onEdit={handleEditCourse}
                        onDelete={handleDeleteCourse}
                      />
                    ))}
                  </CardGroup>
                </Row>
              )}
            </Row>

            <Row>
              <BsPlusCircle
                color="gray"
                onClick={handleAddCourse}
                style={{ cursor: "pointer", fontSize: "80" }}
              ></BsPlusCircle>
            </Row>

            <Modal
              isOpen={isDetailsModal}
              toggle={() => {
                setIsDetailsModal(!isDetailsModal);
              }}
            >
              <ModalHeader className="text-center text-md-left ">
                Edit account details
              </ModalHeader>
              <ModalBody>
                <ListGroup flush>
                  <ListGroupItem>
                    Trainer name :
                    <Row style={{ marginBottom: "20px" }}>
                      <Col>
                        <Input
                          name="name"
                          placeholder="Name"
                          value={updatedUserd.name}
                          onChange={handleChange}
                        ></Input>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Specialty :
                        <Input
                          name="occupation"
                          placeholder="Specialty"
                          value={updatedUserd.occupation}
                          onChange={handleChange}
                        ></Input>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    Locations :
                    <Row style={{ marginBottom: "20px" }} noGutters>
                      {updatedUserd.local.map((local, index) => {
                        return (
                          <Col
                            key={`skill-${index}`}
                            style={{ marginBottom: "20px" }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Input
                                name="local"
                                data-index={index}
                                value={local}
                                onChange={handleChange}
                                style={{
                                  paddingRight: "30px",
                                  width: `${local.length * 9 + 20}px`,
                                  // you can adjust the 8 and 20 values to fit your design
                                }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setUpdatedUserData((prevUpdatedUserData) => {
                                    const newUserData = {
                                      ...prevUpdatedUserData,
                                    };
                                    newUserData.local.splice(index, 1);
                                    return newUserData;
                                  })
                                }
                                style={{
                                  padding: "0 10px",
                                  background: "none",
                                  border: "none",
                                  outline: "none",
                                  fontWeight: "bolder",
                                }}
                              >
                                X
                              </button>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                    <Row>
                      <button
                        type="button"
                        onClick={() =>
                          setUpdatedUserData((prevUpdatedUserData) => {
                            const newUserData = { ...prevUpdatedUserData };
                            newUserData.local.push("");
                            return newUserData;
                          })
                        }
                        style={{
                          padding: "0 10px",
                          background: "none",
                          border: "none",
                          outline: "none",
                          fontWeight: "bolder",
                        }}
                      >
                        <PlusCircleFill
                          style={{ color: "#7D7D7D", fontSize: "35" }}
                        ></PlusCircleFill>
                      </button>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Email:
                        <Input
                          name="email"
                          placeholder="E-mail"
                          value={updatedUserd.email}
                          onChange={handleChange}
                          type="email"
                        ></Input>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    submitDetails();
                  }}
                >
                  Save changes
                </Button>{" "}
                <Button
                  color="secondary"
                  onClick={() => {
                    cancelDetails();
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={isBioModal}
              toggle={() => {
                setIsBioModal(!isBioModal);
              }}
            >
              <ModalHeader className="text-center text-md-left ">
                Edit BIO
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Input
                    name="description"
                    placeholder="Say something about yourself,"
                    value={updatedUserd.description}
                    onChange={handleChange}
                    type="textarea"
                    style={{
                      height: "auto",
                      minHeight: "120px",
                    }}
                  ></Input>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    submitBio();
                  }}
                >
                  Save changes
                </Button>{" "}
                <Button
                  color="secondary"
                  onClick={() => {
                    cancelBio();
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={isUpdateCourseModal}
              toggle={() => {
                setIsUpdateCourseModal(!isUpdateCourseModal);
              }}
            >
              <ModalHeader>Edit Course Details</ModalHeader>
              <ModalBody>
                {courseU && (
                  <UpdateCourseForm
                    course={courseU}
                    onCourseUpdated={() => {
                      setIsUpdateCourseModal(!isUpdateCourseModal);
                      fetchCourses();
                    }}
                  />
                )}
              </ModalBody>
            </Modal>

            <Modal
              isOpen={isAddCourseModal}
              toggle={() => {
                setIsAddCourseModal(!isAddCourseModal);
              }}
            >
              <ModalHeader>Edit Course Details</ModalHeader>
              <ModalBody>
                <AddCourseForm
                  course={courseU}
                  onCourseAdded={() => {
                    setIsAddCourseModal(!isAddCourseModal);
                    fetchCourses();
                  }}
                />
              </ModalBody>
            </Modal>
          </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}
export default EditFormateurProfile;
