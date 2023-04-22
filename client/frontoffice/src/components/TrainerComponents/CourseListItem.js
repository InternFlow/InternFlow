import React, { useEffect, useState } from "react";
import {
  Card, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  CardText, 
  Button,
  Col
} from 'reactstrap';

function CourseListItem(props) {
  const { name, description, price, image } = props.course;
  const { searchTerm } = props;
  const role = localStorage.getItem("role");
  const [Enrolled, setEnrolled] = useState(null);

  function enrollStudentInCourse() {
    fetch(`http://localhost:5000/Course/Enroll/${props.course._id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Enrollment failed");
        }
        return response.json();
      })
      .then((data) => {
        checkEnrollment();
      })
      .catch((error) => {
        console.error(error);
      });
  }


  async function checkEnrollment() {
    try {
      const response = await fetch(`http://localhost:5000/Course/checkEnrollment/${props.course._id}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setEnrolled(data.enrolled);
    } catch (error) {
      console.error(error);
      setEnrolled(false);
    }
  }

  const handleUnenroll = async () => {
    try {
       await fetch(`http://localhost:5000/Course/Unenroll/${props.course._id}`, {
        method: "GET",
        credentials: "include"
      });
      checkEnrollment();
     
    } catch (error) {
      console.error(error);
    }
  };

  // function to replace search term with highlighted text
  const highlightSearchTerm = (text) => {
    if (searchTerm && searchTerm.length > 0) {
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return text.split(regex).map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      );
    } else {
      return text;
    }
  };

  useEffect(()=>{
    checkEnrollment();
  },[])

  return (
    <Col col="4">
    <Card color="light" style={{ width: '18rem' }}>
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody> 
        <CardTitle tag="h5" onClick={()=>{props.onCourseNameClick()}} style={{cursor:"pointer"}}>{highlightSearchTerm(name)}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Price: ${price}
        </CardSubtitle>
        <CardText>{highlightSearchTerm(description)}</CardText>

        {role ==='condidat' &&(<>
        {!Enrolled ? (<Button onClick={enrollStudentInCourse}>Enroll</Button>):(<Button onClick={handleUnenroll}>unEnroll</Button>)}</>
        )}
      </CardBody>
    </Card>
  </Col>
  );
}

export default CourseListItem;
