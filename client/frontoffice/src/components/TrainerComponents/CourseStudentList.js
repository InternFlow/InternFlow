import React, { useEffect, useState } from 'react'
import { List } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Card, Input, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

export default function CourseStudentList(props) {
    const {courseId} = props;
    const [studentList,setStudentList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    const fetchEnrolledList = async () => {
        try {
          const response = await fetch(`http://localhost:5000/Course/EnrolledList/${courseId}`, {
            method: 'GET',
            credentials: 'include',
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
      
          const responseData = await response.json();
          setStudentList(responseData.students);
        } catch (err) {
          console.error(err);
        }
      };
      const filteredStudentList = studentList.filter((student) => {
        const name = student.name?.toLowerCase();
        const lastName = student.lastName?.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
    
        return (
          name?.includes(searchTermLower) ||
          lastName?.includes(searchTermLower) 
        );
      });

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
      
    useEffect(()=>{
        fetchEnrolledList();
    })


  return (
    <div>
        <ListGroup>
            {studentList &&(<><ListGroupItemHeading>
                <Input type='search' onChange={handleSearchChange} value={searchTerm}
                placeholder='Search'/>
            </ListGroupItemHeading>
        {(studentList.length === 0) ? (<p>No students enrolled yet</p>):(<>{filteredStudentList.map((student)=>(
            <ListGroupItem>
                <Link to={"/Profile/"+student._id}>
            <img src={student.pfpPath} alt="image" 
            style={{float:"left",width:"30px",height:"30px",borderRadius:"50%"}} /> 
            <p style={{
                display:"inline-block",
                 verticalAlign:"top",
                  textDecoration:"underline",
                  color:"blue",
                  fontWeight:"bold",
                  overflow:"-moz-hidden-unscrollable"
                  }}>
                {student.name &&(<>{student.name}</>)}
                {student.lastName &&(<>{student.lastName}</>)}
                </p>
                </Link>
            </ListGroupItem>
        ))}</>
        )}
         </>)}
        </ListGroup>
    </div>
  )
}
