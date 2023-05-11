import CourseListItem from 'components/TrainerComponents/CourseListItem'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

export default function CoursesSubHeader() {

const history = useHistory();
    const [courses, setCourses] = useState([])
    const fetchCourses = async ()=> {
        try {
          const response = await fetch('http://localhost:5000/course');
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(() => {
        fetchCourses();
      }, []);
    

  return (
    <div><Container>
        <h4>Browse our courses</h4>
    {courses.length !==0 &&(<Row>
    {courses
    .slice(0,2)
    .map((course,Index ) => (
      <Col md="3" >
            <CourseListItem key={course._id} course={course}  onCourseNameClick={()=>{
              history.push("/ViewClasses/"+course._id)
            }}  />
            </Col>
          ))}
    </Row>)}
    </Container></div>
  )
}
