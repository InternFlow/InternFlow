import React from 'react';
import {
  ModalBody,
  ModalHeader
} from 'reactstrap'
const Course = (props) => {
  const {
    name,
    description,
    price,
    classes,
    enrollmentStartDate,
    enrollmentEndDate,
    courseStartDate,
    courseEndDate,
    tags,
  } = props.course;

  return (
    <div>
        <ModalHeader>
        <h3>{name}</h3>
        </ModalHeader>
        <ModalBody> 
      <div>
        
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Enrollment Period: {enrollmentStartDate} - {enrollmentEndDate}</p>
        <p>Course Dates: {courseStartDate} - {courseEndDate}</p>
        <p>Tags: #{tags.join(", #")}</p>
      </div>
        </ModalBody>
    </div>
  );
}

export default Course;