import React , { useState } from 'react';

import CourseListItem from "./CourseListItem";
import Course from "./Course"
import{
  Card,
  Row,
  Col,
  Container,
  CardHeader,
  CardGroup,
  CardBody,
  Input,
  Modal
} from 'reactstrap'


import courseList from "./courseList.json"

function CourseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseIndex, setCourseIndex] = useState(0);
  const [courseModalOpen,setCourseModalOpen]= useState(false);
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
    <Col col="12" >
      <Card style={{backgroundColor:'#D3d3d3'}} className='card no-transition'>
        <CardBody >
           <Row style={{marginBottom:"12px"}}>
            <Col> 
            <h3 >Courses</h3>
            </Col>
            </Row>
            <Row>
              <Col md="5">
            <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          </Col>
            </Row>  
        </CardBody>
      </Card>
    </Col>
  </Row>
  <Row>
    <Card style={{padding: "18px",backgroundColor:'#D3d3d3'}} className='card no-transition'>
      <CardGroup>
      {filteredCourses.map((course,Index ) => (
        <CourseListItem key={course.id} course={course} searchTerm={searchTerm} onCourseNameClick={()=>{
          setCourseIndex(Index);
          setCourseModalOpen(true);
        }}  />
      ))}
      </CardGroup>
    </Card>
  </Row>

        <Modal isOpen={courseModalOpen} toggle={()=>{setCourseModalOpen(!courseModalOpen)}}>
          <Course course={courseList[courseIndex]}>

          </Course>
        </Modal>

</Container>
   </div>
  );
}

export default CourseList;