import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, InputGroup, InputGroupAddon, Row, Col, Card, CardTitle} from 'reactstrap';

import { PlusCircleFill } from "react-bootstrap-icons";
const UpdateCourseForm = (props) => {

  
  const [courseUpdated, setCourseUpdated] = useState(null)
  const {onCourseUpdated} = props;
  const [course, setCourse] = useState({
    ...props.course,
    enrollmentStartDate: new Date(props.course.enrollmentStartDate).toISOString().substring(0, 10),
    enrollmentEndDate: new Date(props.course.enrollmentEndDate).toISOString().substring(0, 10),
    courseStartDate: new Date(props.course.courseStartDate).toISOString().substring(0, 10),
    courseEndDate: new Date(props.course.courseEndDate).toISOString().substring(0, 10),
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    enrollmentStartDate: "",
    enrollmentEndDate: "",
    courseStartDate: "",
    courseEndDate: "",
    tags: "",
    image: "",
    maxParticipants: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === "tags")
    {
      const index = event.target.getAttribute("data-index");
      setCourse((prevState) => {
        const newState = {...prevState};
        newState[name][index] = value;
        return newState;
      });
    }
    else{
    setCourse({
      ...course,
      [name]: value,
    });}
  };


  const handleDateChange = (event) => {
    const inputName = event.target.name;
    const inputValue = new Date(event.target.value);
    const formattedDate = inputValue.toISOString().substring(0, 10); // yyyy-MM-dd format
    setCourse((prevState) => ({
      ...prevState,
      [inputName]: formattedDate
    }));
  };
  

  const updateCourse = async (updatedCourse) => {
    try {
      const id = updatedCourse._id;
      const response = await fetch(`http://localhost:5000/Course/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCourse)
        ,credentials: 'include'
      });
  
      if (!response.ok) {
        const error = await response.json();
        setCourseUpdated("Something went wrong")
      
        throw new Error(error.message);
      }
      setCourseUpdated("Course updated successfully")
      onCourseUpdated();
      const updated = await response.json();
      return updated;
    } catch (error) {
      console.error(error);
      setCourseUpdated("Something went wrong")
    }
  };
  

  const handleSubmit = () => {
    
    
    if(validate()){
      updateCourse(course)
    .catch(err => console.error('Error updating course:', err));
  }
  };

  const validate = () => {
    let isError = false;
    const error = {
      name: "",
      description: "",
      price: "",
      enrollmentStartDate: "",
      enrollmentEndDate: "",
      courseStartDate: "",
      courseEndDate: "",
      tags: "",
      image: "",
    };
    
    if (course.name.trim() === "") {
      error.name = "Name is required";
      isError = true;
    }

    
    if (course.description.trim() === "") {
      error.description = "Description is required";
      isError = true;
    }

    if (course.price === "") {
      error.price = "Price is required";
      isError = true;
    } else if (isNaN(course.price)) {
      error.price = "Price must be a number";
      
      isError = true;
    } else if (course.price < 0) {
        error.price = "Price must be a positive number";
        isError = true;
      }
      
      if (course.maxParticipants === "") {
        error.price = "Max participants is required";
        isError = true;
      } else if (isNaN(course.maxParticipants)) {
        error.price = "Max participants must be a number";
        
        isError = true;
      } else if (course.maxParticipants < 0) {
          error.price = "Max participants must be a positive number";
          isError = true;
        }

      

    if (course.enrollmentStartDate.trim() === "") {
      error.enrollmentStartDate = "Enrollment start date is required";
      isError = true;
    }

    if (course.enrollmentEndDate.trim() === "") {
      error.enrollmentEndDate = "Enrollment end date is required";
      isError = true;
    }

    if (course.courseStartDate.trim() === "") {
      error.courseStartDate = "Course start date is required";
      isError = true;
    }

    if (course.courseEndDate.trim() === "") {
      error.courseEndDate = "Course end date is required";
      isError = true;
    }
    
   

    if (course.image.trim() === "") {
      error.image = "Image URL is required";
      isError = true;
    }
    setErrors(error);
    return !isError;
  };

  return (
    <Card style={{padding:"5%"}}>
    <CardTitle>Update Course</CardTitle>
  
  <Form >
    <FormGroup>
      <Label for="name">Name</Label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Enter course name"
        value={course.name}
        onChange={handleInputChange}
      />
      {errors.name && (
        <Alert color="danger">
          {errors.name}
        </Alert>
      )}
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input
        type="textarea"
        name="description"
        id="description"
        placeholder="Enter course description"
        value={course.description}
        onChange={handleInputChange}
      />
      {errors.description && (
        <Alert color="danger">
          {errors.description}
        </Alert>
      )}
    </FormGroup>

    
    <FormGroup>
      <Label for="maxParticipants">Maximum number of Participants</Label>
      <InputGroup>
        <Input
          type="number"
          name="maxParticipants"
          id="maxParticipants"
          placeholder="Enter Maximum number of Participants"
          value={course.maxParticipants}
          onChange={handleInputChange}
          min="0"
        />
      </InputGroup>
      {errors.maxParticipants && (
        <Alert color="danger">
          {errors.maxParticipants}
        </Alert>
      )}
    </FormGroup>
    <FormGroup>
      <Label for="price">Price</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Enter course price"
          value={course.price}
          onChange={handleInputChange}
          min="0"
        />
      </InputGroup>
      {errors.price && (
        <Alert color="danger">
          {errors.price}
        </Alert>
      )}
    </FormGroup>
    <FormGroup>
      <Label for="enrollmentStartDate">Enrollment Start Date</Label>
      <Input
        type="date"
        name="enrollmentStartDate"
        id="enrollmentStartDate"
        placeholder="Enter enrollment start date"
        value={course.enrollmentStartDate}
        onChange={handleDateChange}
      />
      {errors.enrollmentStartDate && (
        <Alert color="danger">
          {errors.enrollmentStartDate}
        </Alert>
      )}
    </FormGroup>
    <FormGroup>
      <Label for="enrollmentEndDate">Enrollment End Date</Label>
      <Input
        type="date"
        name="enrollmentEndDate"
        id="enrollmentEndDate"
        placeholder="Enter enrollment end date"
        value={course.enrollmentEndDate}
        onChange={handleDateChange}
      />
      {errors.enrollmentEndDate && (
        <Alert color="danger">
          {errors.enrollmentEndDate}
        </Alert>
      )}
    </FormGroup>
    <FormGroup>
      <Label for="courseStartDate">Course Start Date</Label>
      <Input
        type="date"
        name="courseStartDate"
        id="courseStartDate"
        placeholder="Enter course start date"
        value={course.courseStartDate}
        onChange={handleDateChange}
      />
      {errors.courseStartDate && (
        <Alert color="danger">
          {errors.courseStartDate}
        </Alert>
      )}
    </FormGroup>
    <FormGroup>
      <Label for="courseEndDate">Course End Date</Label>
      <Input
        type="date"
        name="courseEndDate"
        id="courseEndDate"
        placeholder="Enter course end date"
        value={course.courseEndDate}
        onChange={handleDateChange}
      />
      {errors.courseEndDate && (
        <Alert color="danger">
          {errors.courseEndDate}
        </Alert>
      )}
    </FormGroup>
    <FormGroup>
      <Label for="image">Image</Label>
      <Input
        type="text"
        name="image"
        id="image"
        placeholder="Enter course image URL"
        value={course.image}
        onChange={handleInputChange}
      />
      {errors.image && (
        <Alert color="danger">
          {errors.image}
        </Alert>
        )}
      </FormGroup>
      <FormGroup>
                  Tags:
                <Row style={{marginBottom: "20px",}} noGutters>
                   {course.tags.map((tag, index)=>{
                    return( 
                      <Col  key={`skill-${index}`} style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                      <Input name="tags" 
                       data-index={index}
                      value={tag}
                      onChange={handleInputChange}
                      style={{
                        paddingRight: "30px",
                        width: `${tag.length * 9 + 20}px`,
                        // you can adjust the 8 and 20 values to fit your design
                      }}
                      />
                      <button
                        type="button"
                    onClick={() =>
                    setCourse((prevCourse) => {
                    const newCourse = { ...prevCourse };
                    newCourse.tags.splice(index, 1);
                    return newCourse;
                       })
                     }
                     style={{
                      padding: "0 10px",
                      background: "none",
                      border: "none",
                      outline: "none",
                      fontWeight: "bolder"
                    }}
                       >
                        X
                        </button>
                        </div>
                    </Col>
                    );
                   })}
                   </Row>
                    <Row >
                    <button
                        type="button"
                    onClick={() =>
                      setCourse((prevCourse) => {
                    const newCourse = { ...prevCourse };
                    newCourse.tags.push("");
                    return newCourse;
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
                      <PlusCircleFill style={{color:"#7D7D7D", fontSize: "35"}}></PlusCircleFill> 
                        </button>
                    </Row>
                
                </FormGroup>
      <Button color="primary" style={{ margin: '18px' }}  onClick={handleSubmit}>Edit Course</Button>
      {courseUpdated&&(
        <>
        {
          courseUpdated === "Course updated successfully" ? (<Alert color="success">
            {courseUpdated}
          </Alert>):(
            <Alert color="danger">
            {courseUpdated}
          </Alert>
          )
        }
        </>
      )}
    </Form>
    </Card>
  );
};

export default UpdateCourseForm;
