import React , { useState } from 'react';

import CourseListItem from "./CourseListItem";
import{
  Card,
  Row,
  Col,
  Container,
  CardHeader,
  CardGroup,
  CardBody
} from 'reactstrap'


import courseList from "./courseList.json"

function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const filteredCourses = courseList.filter((course) => {
    const name = course.name.toLowerCase();
    const description = course.description.toLowerCase();
    const tags = course.tags.map((tag) => tag.toLowerCase()).join(" ");
    const searchTermLower = searchTerm.toLowerCase();

    return (
      name.includes(searchTermLower) ||
      description.includes(searchTermLower) ||
      tags.includes(searchTermLower)
    );
  });

  return (
   <div>
<Container>
  <Row>
    <Col col="12">
      <Card >
        <h3>Courses</h3>
        <CardBody>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
  <Row>
    <Card style={{padding: "18px"}}>
      <CardGroup>
      {filteredCourses.map((course) => (
        <CourseListItem key={course.id} course={course} searchTerm={searchTerm}/>
      ))}
      </CardGroup>
    </Card>
  </Row>
</Container>
   </div>
  );
}

export default CourseList;