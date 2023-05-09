import { API } from "../../config";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Accordion from "components/Accordion";
import { BsPencilSquare, BsXSquare } from "react-icons/bs";
import { PlusCircleFill } from "react-bootstrap-icons";
import moment from "moment";
import "./style.css";

import offerImage from "../uploads/offers/1681389235310-offers.jpg";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import "./Pagination.css";

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
  CardImg,
} from "reactstrap";
import ImageUpload from "./ImageUpload";
import Swal from "sweetalert2";
import axios from "axios";
import CondidatNavbar from "components/Navbars/CondidatNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SearchOffer from "./offers/SearchOffers";
function EditCompanyProfile() {
  const [userd, setUserData] = useState({
    name: "",
    email: "",
    occupation: "",
    pfpPath:
      "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",
    local: [],
    description: "",
  });

  const [offers, setOffers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const id = localStorage.getItem("id");

  const [isDetailsModal, setIsDetailsModal] = useState(false);
  const [isBioModal, setIsBioModal] = useState(false);
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

  const [isPfpModal, setIsPfpModal] = useState(false);

  const handleAddOffer = async () => {
    history.push(`/AddOfferCompany`);
  };
  console.log(userd._id);

  const handleDelete = async (offerId) => {
    const companyId = localStorage.getItem("id");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${API}/Deletecompanies/${companyId}/offers/${offerId}`,
          {
            withCredentials: true,
          }
        );
        Swal.fire("Success!", "Offer Deleted successfully!", "success");
        getOffer();
        //Refresh Page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  };
  async function getOffer() {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("id");
    if (token) {
      fetch(`http://localhost:5000/Affichercompanies/${companyId}/offers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOffers(data);
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    getOffer();
  }, []);

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
    const id = localStorage.getItem("id");
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
  }, []);

  //----------------------------- Search ---------------------------------------------//
  // const handleSearch = () => {
  //   if (searchText) {
  //     $.ajax({
  //       url: `${API}/Offer/search?query=${searchText}`,
  //       type: 'GET',
  //       dataType: 'json',
  //       success: (data) => {
  //         setSearchResults(data);
  //       },
  //       error: (xhr, status, err) => {
  //         console.error(status, err.toString());
  //       },
  //     });
  //   }
  // };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(${BASE_URL}/visits/search?query=${searchText});
//         setVisites(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, [searchText]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API}/Offer/search?query=${searchText}`);
      setOffers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  }
  

  //-------------------------------- Pagination -------------------------------------------------//
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = offers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  //----------------------------- Card State -----------------------------------------------//
  const [cardState, setCardState] = useState({});
  const handleCardState = (id) => {
    setCardState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      {/* <CondidatNavbar></CondidatNavbar> */}
      <CondidatNavbar />

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
              <Col md="8">
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
            </Row>

            <hr></hr>
            <br></br>
            <br></br>
            <h3 style={{ fontWeight: "bold" }}>Our Offers</h3>
            <br></br>
            <br></br>

            <Form onSubmit={handleSearchSubmit}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="search"
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </InputGroup>
              <br></br>
              <Button 
              color="success"
              type="submit"
              style={{ marginRight: '10px' }}
              >
  <i className="nc-icon nc-zoom-split mr-2"></i>
              </Button>
              <Button color="info" 
                className="mr-2"
              onClick={handleRefresh}>
                <i className="nc-icon nc-refresh-69"></i>
                </Button>

            </Form>
            <br></br>

            <Button color="danger" type="submit" onClick={handleAddOffer}>
              <FontAwesomeIcon icon={faPlus} /> New Offer{" "}
            </Button>

            <br></br>
            <br></br>
            <br></br>
            <Row>
              <Col md="9">
              {/* <Row> */}

              <Row className="justify-content-center my-4">
                  {currentItems.map((offer) => (
                      // <Col md="5" key={offer.id}>

                      <Col xs="12" sm="7" md="8" lg="5" key={offer.id} className="mb-4">
                      {/* <Card className="mb-4 h-100" key={offer.id}  style={{ marginBottom: "20px", alignItems: "center" }}> */}

                      <Card className="mb-1 h-100" key={offer.id}  style={{ marginBottom: "180px", alignItems: "center",  margin: "20px" }}>
                        <CardImg
                          top
                          width="100%"
                          src={offerImage}
                          alt="Offer Image"
                        />
                        <CardBody> 
                          <CardTitle tag="h4">{offer.title}</CardTitle>
                          {/* <p>{offer.description}</p> */}

                          <p>
                            {offer.description.length > 100
                              ? cardState[offer.id]
                                ? offer.description
                                : `${offer.description.slice(0, 100)}...`
                              : offer.description}
                            {offer.description.length > 100 && (
                              <Button
                                color="link"
                                size="sm"
                                className="p-0"
                                onClick={() => handleCardState(offer.id)}
                              >
                                {cardState[offer.id]
                                  ? "Show less"
                                  : "Show more"}
                              </Button>
                            )}
                          </p>
                          <br></br>

                          <div className="d-flex justify-content-between">

                          <Button
                            color="primary"
                            size="sm"
                            style={{ height: "35px", marginRight: "35px" }} // Ajout de la propriété CSS height avec une valeur de 30px

                            onClick={() =>
                              history.push(`/DetailsOffers/${offer._id}`)
                            }
                          >
                            {/* View Details */}
                            <FontAwesomeIcon icon={faEye} />{" "}
                            {/* icône "oeil" */}
                          </Button>
                          {/* <span style={{ marginTop: '120px' }} /> */}
                          <br></br>
                          <br></br>
                          <Button
                            color="success"
                            size="sm"
                            style={{ height: "35px", marginRight: "35px" }} // Ajout de la propriété CSS height avec une valeur de 30px
                            onClick={() =>
                              history.push(
                                `/EditOfferCompany/${id}/offers/${offer._id}`
                              )
                            }
                          >
                            {/* Edit Offer */}
                            <FontAwesomeIcon icon={faEdit} />{" "}
                            {/* icône "crayon" */}
                          </Button>
                          <br></br>
                          <br></br>
                          <Button
                            color="danger"
                            size="sm"
                            style={{ height: "35px", marginRight: "35px" }} // Ajout de la propriété CSS height avec une valeur de 30px
                            onClick={() => handleDelete(offer._id)}
                          >
                            {/* Delete Offer */}
                            <FontAwesomeIcon icon={faTrash} />{" "}
                            {/* icône "poubelle" */}
                          </Button>
                        </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <br></br>
            <br></br>

          

            {/* Pagination */}
            <nav className="d-flex justify-content-center">
              <Pagination>
                {/* Bouton pour aller à la première page */}
                <PaginationItem
                  className="pagination-lg"
                  disabled={currentPage === 1}
                >
                  <PaginationLink
                    style={{ fontWeight: "bold" }}
                    first
                    onClick={() => handlePageClick(1)}
                  />
                </PaginationItem>

                {/* Bouton pour aller à la page précédente */}
                <PaginationItem
                  className="pagination-lg"
                  disabled={currentPage === 1}
                >
                  <PaginationLink
                    style={{ fontWeight: "bold" }}
                    previous
                    onClick={() => handlePageClick(currentPage - 1)}
                  />
                </PaginationItem>

                {/* Boutons pour aller aux pages intermédiaires */}
                {Array(totalPages)
                  .fill()
                  .map((_, index) => {
                    const page = index + 1;
                    return (
                      <PaginationItem
                        className="pagination-lg"
                        key={page}
                        active={page === currentPage}
                      >
                        <PaginationLink
                          style={{ fontWeight: "bold" }}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                {/* Bouton pour aller à la page suivante */}
                <PaginationItem
                  className="pagination-lg"
                  disabled={currentPage === totalPages}
                >
                  <PaginationLink
                    style={{ fontWeight: "bold" }}
                    next
                    onClick={() => handlePageClick(currentPage + 1)}
                  />
                </PaginationItem>

                {/* Bouton pour aller à la dernière page */}
                <PaginationItem
                  className="pagination-lg"
                  disabled={currentPage === totalPages}
                >
                  <PaginationLink
                    style={{ fontWeight: "bold" }}
                    last
                    onClick={() => handlePageClick(totalPages)}
                  />
                </PaginationItem>
              </Pagination>
            </nav>

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
                    Company name :
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
                        Field of work :
                        <Input
                          name="occupation"
                          placeholder="Field of work"
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
          </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}
export default EditCompanyProfile;
