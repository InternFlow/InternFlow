import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row } from "reactstrap";
import UpdateCourseForm from "./UpdateCourseForm";

export default function EditCourse() {

    const [course, setCourse] = useState(null)

    const history = useHistory();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');


    const fetchCourse = async ()=> {
        try {
          const response = await fetch('http://localhost:5000/course/'+id);
          const data = await response.json();
          setCourse(data);
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
        fetchCourse();
      }, []);


  return (
    <div className="content">
      <Row>
        {course&&(<UpdateCourseForm course={course}  onCourseUpdated={()=>{
            history.push('/admin/viewCourses')
        }}/>)}
      </Row>
    </div>
  );
}
