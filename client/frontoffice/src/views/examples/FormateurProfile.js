
import React ,{useState} from "react";
// reactstrap components
import {
  Card, 
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardGroup,
  CardTitle,
  ListGroup,
  ListGroupItem
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory,Link } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import CourseListItem from "components/TrainerComponents/CourseListItem";
import CondidatNavbar from "components/Navbars/CondidatNavbar";

function FormateurProfilePage(props) {
  const id = props.userId;

  
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/Course/trainer/'+id, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  }

  
const [userd, setUserData] = useState({
name: "",
lastName: "",
email: "",
occupation: "",
pfpPath: "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",

skills: [],
local: [],
description: ""
}

);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });


  if (!token) {

    history.push('/sign-in');

  }
  const goedit = async (event) => {

    //history.push('/Edit-condidat-page');

    history.push(`/Edit-condidat-page`);


}




React.useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:5000/profile/'+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      ,credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        fetchCourses();
        const userData = data.user;
        setUserData(userData);
      })
      .catch(error => console.error(error));
  }
}, []);


  return (
    <>
<CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />
      <div className="section profile-content" >
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={userd.pfpPath}
              />
            </div>
          <Row >
            <Col md="4" >
              <Card className="text-center text-md-left">
                <CardHeader>
                <CardTitle  tag="h5" style={{fontWeight:"bold", fontSize: 22}}>{userd.name}</CardTitle>
                  {userd.occupation}
                </CardHeader>
                <CardBody>
                <ListGroup flush>
                <ListGroupItem className="justify-content-between">
              Locations :
                  <ul className="description">{userd.local.map((local, index)=>{
                    return( 
                        <>
                        <li>{local}</li>
                        </>
                    )})}</ul>
     
              </ListGroupItem>
            <ListGroupItem className="justify-content-between">
            Contact :
                    <h6 className="description">{userd.email} </h6>
  
             </ListGroupItem>
       
</ListGroup>
                  
                
                    
                    
                </CardBody>
              </Card >
            </Col>
            <Col md="8">
             
              <Card className="text-center text-md-left" >
              <CardHeader>About:</CardHeader>
              <CardBody style={{padding: "18p"}}>
                <h5 className="text-uppercase">Bio:</h5>
              <p>{userd.description}</p>
 
   

              </CardBody>
                </Card>
            
            </Col>
          </Row>

          <CardGroup>
      {courses.map((course,Index ) => (
        <CourseListItem key={course._id} course={course} searchTerm={""} onCourseNameClick={()=>{
        console.log("name clicked")
        }} />
      ))}
      </CardGroup>

      
      <Row>
              <Link
                to={{
                  pathname: "/UserEvent",
                  search: `?data=${JSON.stringify(id)}`,
                }}
              >
                <button className="btn-round btn btn-success btn-block">
                  Events
                </button>
              </Link>
            </Row>
           </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}


export default FormateurProfilePage;
