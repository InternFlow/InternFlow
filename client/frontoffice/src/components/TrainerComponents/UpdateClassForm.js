import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Alert
} from "reactstrap";

export default function UpdateClassForm(props) {
    const {onUpdateClass} = props;
    const [newClass, setNewClass] = useState({
      ...props.class,
      startDateTime: new Date(props.class.startDateTime).toISOString().substring(0, 10)
    });
    
      const [error, setError] = useState({
        name: "",
        description: "",
        startDateTime: "",
        duration: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setNewClass((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleError = ()=>{
        setError((prevError)=>{
            const newError = {...prevError};
            newError.name = newClass.name.length < 3 ? "Name must be at least 3 characters long!" : "";
              
            newError.description = newClass.description.length < 10 ? "Description must be at least 10 characters long!" : "";
           
            newError.startDateTime = !newClass.startDateTime ? "Start date and time cannot be empty!" : "";
            
            newError.duration = !newClass.duration ? "Duration cannot be empty!" : "";
    
            return newError;
        }); 
      }
    
      const handleSubmit = (e) => {
        
        e.preventDefault();
        
        if (
          !(newClass.description.length < 10) &&
          !(newClass.name.length < 3)  &&
          newClass.startDateTime &&
          newClass.duration !== ""
        ) {
            onUpdateClass(newClass);
         
        }else handleError();
      };
    
      return (
        <Form >
          
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter class name"
              value={newClass.name}
              onChange={handleChange}
              minLength="3"
              maxLength="50"
              required
            />
            {error.name !== "" && (
              <Alert color="danger">{error.name}</Alert>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              placeholder="Enter class description"
              value={newClass.description}
              onChange={handleChange}
              minLength="10"
              maxLength="500"
              required
            />
            {error.description !== "" && (
              <Alert color="danger">{error.description}</Alert>
            )}
          </FormGroup>
          <FormGroup>
              <Label for="startDateTime">Start Date and Time</Label>
             <Input
               type="datetime-local"
              name="startDateTime"
               id="startDateTime"
             placeholder="Start Date and Time"
              value={newClass.startDateTime}
              onChange={handleChange}
             />
             {error.startDateTime !== "" && (
             <Alert color="danger">{error.startDateTime}</Alert>
            )}
            </FormGroup>
            <FormGroup>
             <Label for="duration">Duration</Label>
             <Input
             type="text"
               name="duration"
              id="duration"
               placeholder="Duration"
               value={newClass.duration}
                onChange={handleChange}
             />
              {error.duration !== "" && (
             <Alert color="danger">{error.duration}</Alert>
              )}
            </FormGroup>
            <Button color="primary"  onClick={handleSubmit}>Edit Class</Button>
        </Form>
      );
    };