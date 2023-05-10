import React from "react";
import { useState, useEffect } from "react";
import UpdateEventForm from "./EditEvent";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Pagination,
  Button,
  PaginationItem,
  PaginationLink,
  Input,
  Form,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
} from "reactstrap";

import ReactPaginate from "react-paginate";
import axios from "axios";
import { useHistory } from "react-router-dom";

function EventPage() {
  const [Events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const eventsPerPage = 5;
  const pagesVisited = pageNumber * eventsPerPage;

  const history = useHistory();

  async function getEvents() {
    try {
      const response = await axios.get("http://localhost:5000/Event/allEvents");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  const editEvent = (id) => {
    history.push(`/Admin/editevent/?id=${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/Event/search?query=${searchText}`
      );
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (id) => {
    const result = window.confirm("Are you sure you want to delete?");
    await axios
      .delete(`http://localhost:5000/Event/deleteevent/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        history.push("/admin/eventPage");
      });
  };

  async function updateEvent(eventid, updatedEvent) {
    axios
      .put(`http://localhost:5000/Event/updateevent/${eventid}`, updatedEvent)

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Définir les en-têtes de colonne pour le tableau

  const pageCount = Math.ceil(Events.length / eventsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <br></br>
            <br></br>

            <Form onSubmit={handleSearchSubmit}>
              <Row>
                <Col md="4">
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

                  <Button variant="success" type="submit">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>

            <CardHeader>
              <CardTitle tag="h4" style={{ fontWeight: "bold" }}>
                Display All Events
              </CardTitle>
            </CardHeader>

            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>poster</th>
                    <th>Title</th>
                    <th>creator</th>
                    <th>Description</th>
                    <th>type</th>
                    <th>category</th>
                    <th>address</th>
                    <th>startDate</th>
                    <th>Phone number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Events.slice(pagesVisited, pagesVisited + eventsPerPage).map(
                    (event) => (
                      <tr key={event._id}>
                        <td>
                          <img
                            src={`http://127.0.0.1:5000/uploads/${event.imagePath}`}
                            alt="Event img"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>

                        <td>{event.title}</td>
                        <td>{event.creator}</td>
                        <td>{event.description}</td>
                        <td>{event.location}</td>
                        <td>{event.category}</td>
                        <td>{event.address}</td>
                        <td>
                          {new Date(event.startDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{event.moreInfo}</td>
                        <td>
                          <Button
                            style={{ marginTop: "22px" }}
                            variant="danger"
                            onClick={() => deleteEvent(event._id)}
                          >
                            Delete
                          </Button>
                        </td>

                        <td>
                          <td>
                            <UpdateEventForm
                              eventdata={event}
                              updateEvent={updateEvent}
                            />
                          </td>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              <br></br>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
              />
              <br></br>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EventPage;
