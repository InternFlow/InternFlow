import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filteredCourses.length / usersPerPage);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/course");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card style={{ padding: "5%" }}>
              <CardHeader>
                <CardTitle tag="h4" style={{ fontWeight: "bold" }}>
                  Display All Courses
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <FormGroup>
                    <Label for="search">Search:</Label>
                    <Input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Entrez votre recherche"
                      value={searchTerm}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Row>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Trainer</th>
                      <th>Course Name</th>
                      <th>Tags</th>
                      <th>Max Participants</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((course, index) => (
                        <tr key={index}>
                          <td>{course.trainer.name}</td>
                          <td>{course.name}</td>
                         
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle caret>Tags</DropdownToggle>
                              <DropdownMenu>
                                {course.tags.map((tag, tagindex) => (
                                  <DropdownItem key={tagindex}>
                                    {tag}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                          <td>{course.maxParticipants}</td>
                          <td><Button
                      style={{marginTop: "22px" }}
                      variant="danger"
                     >Delete</Button>
                      <Button
                       style={{marginTop: "22px" }}
                       variant="secondary"
                      >Edit</Button>
                     </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <ReactPaginate
                  previousLabel={"< ."}
                  nextLabel={". >"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"pagination"}
                  previousLinkClassName={"previous_page"}
                  nextLinkClassName={"next_page"}
                  disabledClassName={"disabled"}
                  activeClassName={"active"}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
