import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import ReactPaginate from "react-paginate";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ConsultEvents() {
  const [Events, setEvents] = useState([]);
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

  // Définir les en-têtes de colonne pour le tableau

  const pageCount = Math.ceil(Events.length / eventsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  async function updateStatus(id, status) {
    try {
      const response = await axios.put(
        `http://localhost:5000/Event/Eventstatus/${id}`,
        { status: status }
      );
      console.log(response);
      Swal.fire("Good job!", "Status Changed", "success");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <br></br>
            <br></br>
            <CardHeader>
              <CardTitle tag="h4" style={{ fontWeight: "bold" }}>
                Events Waiting list
              </CardTitle>
            </CardHeader>

            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>poster</th>
                    <th>Title</th>
                    <th>creator ID</th>
                    <th>Description</th>
                    <th>type</th>
                    <th>category</th>
                    <th>startDate</th>
                    <th>Contact us</th>
                    <th>Status</th>
                    <th>Accept/Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {Events.slice(pagesVisited, pagesVisited + eventsPerPage).map(
                    (event) => (
                      <tr key={event._id}>
                        <td>
                          <img
                            src={`http://localhost:5000/uploadImage/images/${event.imagePath}`}
                            alt="Event img"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>

                        <td>{event.title}</td>
                        <td>{event.user}</td>
                        <td>{event.description}</td>

                        <td>{event.location}</td>
                        <td>{event.category}</td>
                        <td>
                          {new Date(event.startDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{event.moreInfo}</td>
                        <td>{event.status}</td>

                        <td>
                          {" "}
                          <Button
                            variant="success"
                            onClick={() => updateStatus(event._id, "Approved")}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => updateStatus(event._id, "Rejected")}
                          >
                            Reject
                          </Button>
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

export default ConsultEvents;
