import React, { useEffect, useState } from 'react'
import MyClasses from 'components/TrainerComponents/MyClasses'
import { useParams } from "react-router-dom";
import { Card, CardHeader, Col, Container, Row } from 'reactstrap';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import CourseStudentList from 'components/TrainerComponents/CourseStudentList';
import CondidatNavbar from 'components/Navbars/CondidatNavbar';
export default function ManageClasses() {
    const { id } = useParams();
    const [course, setCourse]=useState();

    const getCourseById = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/Course/${id}`);
      
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
      
          const course = await response.json();
          return course;
        } catch (error) {
          console.error(error);
        }
      };

      

    const getCourse = async (id) => {
        try {
          const course = await getCourseById(id);
          setCourse(course);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(()=>{
        getCourse(id);
      },[])
      
  return (
    <div>
      <CondidatNavbar/>
      <ProfilePageHeader />
      <Container>
      {course &&(
        <Row>
       <Col md="3">
       <Card className='card no-transition' style={{minHeight:"500px"}}>
        <CourseStudentList courseId={course._id}/>
       </Card>
        </Col>
        <Col md="9">
        <Card className='card no-transition'>
        {course && (<>
          <CardHeader><h3>{course.name}</h3></CardHeader> 
       <MyClasses course={course} onChange={()=>getCourse(id)} ></MyClasses></>)} 
        </Card>
        </Col>
        </Row>
)}
      </Container>
    </div>
  )
}
