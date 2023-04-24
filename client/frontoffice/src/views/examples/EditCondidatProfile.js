import { API } from "../../config";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Accordion from 'components/Accordion';
import {BsPencilSquare, BsXSquare } from 'react-icons/bs';
import { PlusCircleFill } from 'react-bootstrap-icons'
import moment from "moment";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Container,
  Col, CardText, ListGroup,
  ListGroupItem,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Alert
} from "reactstrap";
import ImageUpload from "./ImageUpload";
import CondidatNavbar from "components/Navbars/CondidatNavbar";
function EditCondidatProfile() {
  const [userd, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    occupation: "",
    pfpPath: "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",
    educations: [
      {
        schoolName: "",
        degree: "",
        description: "",
        startDate:"",
        endDate:""
      }
    ],
    experiences: [
      {
        jobTitle: "",
        company: "",
        description: "",
        startDate:"",
        endDate:""
      }
    ],
    skills: [],
    local: [],
    description: ""
  }
    
  );
  

const [isDetailsModal, setIsDetailsModal] = useState(false);
const [isBioModal, setIsBioModal] = useState(false);
const [isWorkExperienceModal, setIsWorkExperienceModal] = useState(false)
const [workExperienceIndex, setWorkExperienceIndex] = useState(-1)
const [updatedUserd, setUpdatedUserData]  = useState({
  name: "",
  lastName: "",
  email: "",
  occupation: "",
  pfpPath: "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",
  educations: [
    {
      schoolName: "",
      degree: "",
      description: ""
    }
  ],
  experiences: [
    {
      jobTitle: "",
      company: "",
      description: ""
    }
  ],
  skills: [],
  local: [],
  description: ""
});
const [isEducationModal, setIsEducationModal] = useState(false)
const [isPfpModal, setIsPfpModal] = useState(false)
const [error, setError] = useState({name:'', lastName:'',occupation:'', local:'',email:'',bio:''})
const [educationIndex, setEducationIndex] = useState(-1)


 
  const history = useHistory();
///////
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
 

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userd)
        ,credentials: 'include'
      };

      const response = await fetch(`${API}/Condidat/editprofile`, requestOptions);
      setUserData(await response.json().user);
      //   onUpdate(data.user);
      history.push("/profile-page");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }

  };
//////////
const detailsModal= ()=>{
  setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
  setIsDetailsModal(true);
}
////////
const bioModal = () =>{
  setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
  setIsBioModal(true);
}
////////
const submitDetails= async  () =>{
  try{
    if(detailsFormControl()){
  await saveUser(updatedUserd);
  setIsDetailsModal(false);}
}
  catch (error){
    console.log(error)
  }
}




///////////
const cancelBio= () =>{
  setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
  setIsBioModal(false);
}
////////
const submitBio= async () =>{
  if(bioFormControl())
  {await saveUser(updatedUserd);
  setIsBioModal(false);}
}
/////
function bioFormControl() {
  if(updatedUserd.description.length<25){
    setError((prevErr) => {
          const err = {...prevErr};
          err.bio = 'Bio must be at least 25 characters';
          return err;
    }) ;
    return false;
  }else{
      setError((prevErr) => {
            const err = {...prevErr};
            err.name = '';
            return err;
      }) 
  }
  return true;
}

///////////
function detailsFormControl() {
  let res=true;
  //check email integrity
  if(updatedUserd.email.trim()===''){
    setError((prevErr) => {
          const err = {...prevErr};
          err.email = 'Email is required';
          console.log();
          return err;
    }) ;
    
    res= false;
  }
  else if(!/\S+@\S+\.\S+/.test(updatedUserd.email))
  {
    setError((prevErr) => {
      const err = {...prevErr};
      err.email = 'Invalid Email';
      console.log();
      return err;
}) ;

res= false;
  }
  else{
    setError((prevErr) => {
      const err = {...prevErr};
      err.email = '';
      return err;
}) ;
  }

//check for empty skills and remove them
updatedUserd.skills.forEach((skill, index) =>{
  if(skill ===''|| !skill)
  {
    setUpdatedUserData((prevUpdatedUserData) => {
      const newUserData = { ...prevUpdatedUserData };
      newUserData.skills.splice(index, 1);
      return newUserData;
         })
  }
})


if(updatedUserd.name.trim()===''){
  setError((prevErr) => {
        const err = {...prevErr};
        err.name = 'Name is required';
        return err;
  }) ;
  res= false;
}else{
    setError((prevErr) => {
          const err = {...prevErr};
          err.name = '';
          return err;
    }) 
}

if(updatedUserd.lastName.trim()===''){
  setError((prevErr) => {
        const err = {...prevErr};
        err.lastName = 'Last name is required';
        return err;
  }) ;
  res= false;
}else{
    setError((prevErr) => {
          const err = {...prevErr};
          err.lastName = '';
          return err;
    }) 
}

if(updatedUserd.occupation.trim()===''){
  setError((prevErr) => {
        const err = {...prevErr};
        err.occupation = 'Occupation is required';
        return err;
  }) ;
  res= false;
}else{
    setError((prevErr) => {
          const err = {...prevErr};
          err.occupation = '';
          return err;
    }) 
}

if(updatedUserd.local[0].trim()===''){
  setError((prevErr) => {
        const err = {...prevErr};
        err.local = 'Location is required';
        return err;
  }) ;
  res= false;
}else{
    setError((prevErr) => {
          const err = {...prevErr};
          err.local = '';
          return err;
    }) 
}

console.log("Error object:",JSON.stringify(error));
    return res;
}


/////////////
const cancelDetails= () =>{
  setUpdatedUserData(JSON.parse(JSON.stringify(userd)));
  setIsDetailsModal(false);
}



/////////
const handleChange = (event) => {
  const { name, value } = event.target;
  

  setUpdatedUserData((prevUserData) => {
    // Create a copy of the previous state to modify
    const newUserData = { ...prevUserData };
    
    // Handle changes to scalar attributes
    if (name !== "educations" && name !== "experiences" && name !== "skills" && name !== "local") {
      newUserData[name] = value;
    }
    // Handle changes to educations or experiences list
    else if (name === "educations" || name === "experiences") {
      const index = event.target.getAttribute("data-index");
      const field = event.target.getAttribute("data-field");
      newUserData[name][index][field] = value;
    }
    // Handle changes to skills or local list
    else {
      const index = event.target.getAttribute("data-index");
      
        newUserData[name][index] = value;
      
    }
    
    // Return the modified state
    return newUserData;
  });
};


// Function to add an education to the user's profile
const addEducation = () => {
  try {
    // Update the user data with a new education object
    setUpdatedUserData(prevState => {
      const newUserData = { ...prevState };
      newUserData.educations.push({
        schoolName: "",
        degree: "",
        description: ""
      });
      // Set the index of the newly added education
      setEducationIndex(newUserData.educations.length - 1);
      return newUserData;
    });
    // Open the education modal
    setIsEducationModal(true);
  } catch (error) {
    console.log(error);
  }
};

  const addWorkExperience = () => {
    try {
      // Update the user's data by pushing a new work experience object to the experiences array
      setUpdatedUserData(prevState => {
        const newUserData = { ...prevState };
        newUserData.experiences.push({
          jobTitle: "",
          company: "",
          description: ""
        });
        // Set the index of the new work experience to the last item in the array
        setWorkExperienceIndex(newUserData.experiences.length - 1);
        return newUserData;
      });
      // Open the modal to allow the user to fill out the new work experience
      setIsWorkExperienceModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveUser (user) {
    const id = localStorage.getItem("id");
try 
 { const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
      ,credentials: 'include'
    };

    await fetch(`${API}/Condidat/editmyprofile`, requestOptions);
    getProfile();
  }catch (error){
  console.log(error);
}

}


 async function getProfile(){
    
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      ,credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.user);
        const updatedUser = { ...userd , ...data.user};
        setUserData(updatedUser);
        setUpdatedUserData(JSON.parse(JSON.stringify(updatedUser)));
      })
      .catch(error => console.error(error));
  }
}

React.useEffect(()=>{
  getProfile();
  
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
               style={{cursor:"pointer"}}
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={userd.pfpPath}
                onClick={()=>setIsPfpModal(true)}
              />
              {isPfpModal &&(<ImageUpload 
                onImageUpload={getProfile}
                isOpen={isPfpModal}
                toggle={()=>setIsPfpModal(!isPfpModal)}
                url={userd.pfpPath}
              
              />)}
            </div>
          <Row >
            <Col md="4" >
              <Card className="text-center text-md-left">
                <CardHeader>
                <CardTitle tag="h5" style={{fontWeight:"bold", fontSize: 22}}>{userd.name} {userd.lastName} 
                 <BsPencilSquare
        fontSize={30}
        className="pencil-icon"
        color="primary"
        style={{ cursor: "pointer", position: "absolute", right: "15px" }}
        onClick={detailsModal}
        /> 
                
                </CardTitle>
                 <div style={{fontSize: 18}}> {userd.occupation}</div>
                </CardHeader>
                <CardBody>
                <ListGroup flush>
              <ListGroupItem className="justify-content-between">
              Skills :
                  <h6 className="description">{userd.skills.join(', ')}</h6>
     
              </ListGroupItem>
            <ListGroupItem className="justify-content-between">
            Contact :
                    <h6 className="description">{userd.email} </h6>
  
        </ListGroupItem>
          <ListGroupItem className="justify-content-between">
              Residence : 
              <h6 className="description">{userd.local[0]} </h6>

  </ListGroupItem> 
</ListGroup>
                  
                
                    
                    
                </CardBody>
              </Card >
            </Col>
            <Col md="8">
             
              <Card className="text-center text-md-left" >
              <CardHeader>About:</CardHeader>
              <CardBody style={{padding: "18p"}}>
                <div><h5 className="text-uppercase" style={{fontSize:14}}>Bio: <BsPencilSquare
        fontSize={30}
        className="pencil-icon"
        color="primary"
        style={{ cursor: "pointer", position: "absolute", right: "15" }}
        onClick={bioModal}
        /></h5> 
                 </div>
              <p>{userd.description}</p>
 
   
       
        <Accordion title={"Work experience"} >
          <div style={{padding: "20px"}}>
            
          <button
                        type="button"
                    onClick={addWorkExperience}
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
          </div>
          {userd.experiences.map((experience, index) => (
            <Row key={index} style={{padding: "18px"}}>
              <Col className="text-center text-md-left" >
               <Row> <h6 className="text-uppercase">{experience.jobTitle}</h6> 
               <BsPencilSquare
        fontSize={20}
        className="pencil-icon"
        color="primary"
        style={{ cursor: "pointer", position: "absolute", right: "50px" }}
        onClick={()=>{
          
          setWorkExperienceIndex(index);
          setIsWorkExperienceModal(true);
        }}
        /> 
               <div  style={{
                      
                      background: "none",
                      border: "none",
                      outline: "none",
                      cursor: "pointer", 
                      
                    }}>
                <BsXSquare
               
               style={{
                fontSize: "17",
                position: "absolute", 
                      right: "15px",
                      top: "2px"
              }}

                        type="button"
                    onClick={() =>{
                    setUpdatedUserData((prevUserData) => {
                    const newUserData = { ...prevUserData };
                    newUserData.experiences.splice(index, 1);
                    
                    saveUser(newUserData);
                    return newUserData;
                       });
                      }
                     }
                     
                       />
                     </div>   
               
               
               </Row>
                <p style={{fontWeight: 500}}>Worked at: {experience.company} </p><p> from : {new Date(experience.startDate).toLocaleDateString()} to: {new Date(experience.endDate).toLocaleDateString()}</p>
                <p>{experience.description}</p>
              </Col>
            </Row>
            ))}
          </Accordion>
     
         <Accordion title={"Education"} >
         <div style={{padding: "20px"}}>
          <button
                        type="button"
                    onClick={addEducation}
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
          </div>
          {userd.educations.map((education, index) => (
            <Row key={index} style={{padding: "18px"}}>
              <Col className="text-center text-md-left" >
                <Row><h6 className="text-uppercase">{education.degree}</h6>
                
                <BsPencilSquare
        fontSize={20}
        className="pencil-icon"
        color="primary"
        style={{ cursor: "pointer", position: "absolute", right: "50px" }}
        onClick={()=>{
          
          setEducationIndex(index);
          setIsEducationModal(true);
        }}
        /> 
               <div  style={{
                      
                      background: "none",
                      border: "none",
                      outline: "none",
                      cursor: "pointer", 
                      
                    }}>
                <BsXSquare
               
               style={{
                fontSize: "17",
                position: "absolute", 
                      right: "15px",
                      top: "2px"
              }}

                        type="button"
                    onClick={() =>{
                      setUpdatedUserData((prevUserData) => {
                    const newUserData = { ...prevUserData };
                    newUserData.educations.splice(index, 1);
                    
                    saveUser(newUserData);
                    return newUserData;
                       });
                      } 
                     }
                    
                       />
                     </div>   
               
                
                </Row>
                <p style={{fontWeight: 500}}>Studied at: {education.schoolName} </p><p> from : {new Date(education.startDate).toLocaleDateString()} to: {new Date(education.endDate).toLocaleDateString()}</p>
                <p>{education.description}</p>
              </Col>
            </Row>
            ))}
          </Accordion>
      

              </CardBody>
                </Card>
            
            </Col>
          </Row>




          

            <Modal isOpen={isDetailsModal} toggle={()=>{setIsDetailsModal(!isDetailsModal)}}
            onClosed={()=>{cancelDetails()}}>
              <ModalHeader  className="text-center text-md-left ">
                Edit account details
              </ModalHeader>
              <ModalBody className="d-flex flex-row"> 
              <ListGroup flush>
                <ListGroupItem>
                Full name:
                <Row style={{marginBottom: "20px",}}>
                  
                  <Col>
                     <Input name="name" 
                     placeholder="Name" 
                     value={updatedUserd.name}
                     onChange={handleChange}
                     ></Input>
                     {error.name!=='' && (
                      <Alert color="danger">
                      {error.name}
                    </Alert>
                     )}
                  </Col> 
                  <Col>
                      <Input name="lastName" 
                      placeholder="Last name" 
                      value={updatedUserd.lastName}
                      onChange={handleChange}
                      ></Input>
                      {error.lastName!=='' && (
                      <Alert color="danger">
                      {error.lastName}
                    </Alert>
                     )}
                  </Col>
                </Row>
                </ListGroupItem>
                <ListGroupItem>
                <Row>
                  <Col>
                Occupation:
                <Input name="occupation" 
                      placeholder="Occupation" 
                      value={updatedUserd.occupation}
                      onChange={handleChange}
                      ></Input>
                      {error.occupation!=='' && (
                      <Alert color="danger">
                      {error.occupation}
                    </Alert>
                     )}
                      </Col>
                </Row>
                </ListGroupItem>
                <ListGroupItem>
                  Skills:
                <Row style={{marginBottom: "20px",}} noGutters>
                   {updatedUserd.skills.map((skill, index)=>{
                    return( 
                      <Col  key={`skill-${index}`} style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                      <Input name="skills" 
                       data-index={index}
                      value={skill}
                      onChange={handleChange}
                      style={{
                        paddingRight: "30px",
                        width: `${skill.length * 9 + 20}px`,
                        // you can adjust the 8 and 20 values to fit your design
                      }}
                      />
                      <button
                        type="button"
                    onClick={() =>
                    setUpdatedUserData((prevUpdatedUserData) => {
                    const newUserData = { ...prevUpdatedUserData };
                    newUserData.skills.splice(index, 1);
                    return newUserData;
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
                    setUpdatedUserData((prevUpdatedUserData) => {
                    const newUserData = { ...prevUpdatedUserData };
                    newUserData.skills.push("");
                    return newUserData;
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
                
                </ListGroupItem>
                <ListGroupItem>
                <Row>
                <Col>
                Email:
                <Input name="email" 
                      placeholder="E-mail" 
                      value={updatedUserd.email}
                      onChange={handleChange}
                      type="email"
                      ></Input>
                      {error.email!=='' && (
                      <Alert color="danger">
                      {error.email}
                    </Alert>
                     )}
                    </Col>
                </Row>
                </ListGroupItem>
                <ListGroupItem>
                <Row>
                <Col>
                  Address
                <Input name="local" 
                      placeholder="Address" 
                      value={updatedUserd.local[0]}
                      onChange={handleChange}
                      data-index="0"
                      ></Input>
                      {error.local!=='' && (
                      <Alert color="danger">
                      {error.local}
                    </Alert>
                     )}
                      </Col>
                </Row>

                </ListGroupItem>
                </ListGroup>
              </ModalBody>
              <ModalFooter>
              <Button color="primary" onClick={()=>{submitDetails();}}>Save changes</Button>{' '}
            <Button color="secondary" onClick={()=>{cancelDetails();}}>Cancel</Button>
              </ModalFooter>
            </Modal>


            <Modal isOpen={isBioModal} toggle={()=>{setIsBioModal(!isBioModal)}}
            onClosed={()=>{cancelDetails()}}>
              <ModalHeader  className="text-center text-md-left ">
                Edit BIO
              </ModalHeader>
              <ModalBody>
                <Row>
              <Input name="description" 
                      placeholder="Say something about yourself," 
                      value={updatedUserd.description}
                      onChange={handleChange}
                      type= "textarea"
                      style={{
                        height: 'auto',
                        minHeight: '120px', 
                      }}
                      ></Input>
                      {error.bio!=='' && (
                      <Alert color="danger">
                      {error.bio}
                    </Alert>
                     )}
                  </Row>
              </ModalBody>
              <ModalFooter>
              <Button color="primary" onClick={()=>{submitBio();}}>Save changes</Button>{' '}
            <Button color="secondary" onClick={()=>{cancelBio();}}>Cancel</Button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={isWorkExperienceModal} toggle={()=>{setIsWorkExperienceModal(!isWorkExperienceModal)}}
            onClosed={()=>{cancelDetails()}}>
              <ModalHeader  className="text-center text-md-left ">
                Work experience:
              </ModalHeader>
              {isWorkExperienceModal && (<ModalBody>
                <ListGroup flush>
                  <ListGroupItem>
                    <Row>
                      <Col>
                      Job title:
                      <Input name="experiences" 
                      data-index={workExperienceIndex}
                      data-field="jobTitle"
                      placeholder="Job title" 
                      value={updatedUserd.experiences[workExperienceIndex].jobTitle}
                      onChange={handleChange}
                      type= "text"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                      Work place:
                      <Input name="experiences" 
                      data-index={workExperienceIndex}
                      data-field="company"
                      placeholder="Work place" 
                      value={updatedUserd.experiences[workExperienceIndex].company}
                      onChange={handleChange}
                      type= "text"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                      Work description:
                      <Input name="experiences" 
                      data-index={workExperienceIndex}
                      data-field="description"
                      value={updatedUserd.experiences[workExperienceIndex].description}
                      onChange={handleChange}
                      type= "textarea"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                      Period:
                      <Input name="experiences" 
                      data-index={workExperienceIndex}
                      data-field="startDate"
                      placeholder="Start date" 
                      value={updatedUserd.experiences[workExperienceIndex].startDate}
                      onChange={handleChange}
                      type= "Date"
                      />
                      <Input name="experiences" 
                      data-index={workExperienceIndex}
                      data-field="endDate"
                      placeholder="End date" 
                      value={updatedUserd.experiences[workExperienceIndex].endDate}
                      onChange={handleChange}
                      type= "Date"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </ModalBody>)}
              <ModalFooter>
              <Button color="primary" onClick={()=>{saveUser(updatedUserd); setIsWorkExperienceModal(false);}}>Save changes</Button>{' '}
            <Button color="secondary" onClick={()=>{cancelDetails(); setIsWorkExperienceModal(false);}}>Cancel</Button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={isEducationModal} toggle={()=>{setIsEducationModal(!isEducationModal)}} 
            onClosed={()=>{cancelDetails()}}>
              <ModalHeader  className="text-center text-md-left ">
                Work experience:
              </ModalHeader>
              {updatedUserd.educations[educationIndex] && (<ModalBody>
                <ListGroup flush>
                  <ListGroupItem>
                    <Row>
                      <Col>
                      Degree:
                      <Input name="educations" 
                      data-index={educationIndex}
                      data-field="degree"
                      placeholder="Degree" 
                      value={updatedUserd.educations[educationIndex].degree}
                      onChange={handleChange}
                      type= "text"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                      School:
                      <Input name="educations" 
                      data-index={educationIndex}
                      data-field="schoolName"
                      placeholder="School" 
                      value={updatedUserd.educations[educationIndex].schoolName}
                      onChange={handleChange}
                      type= "text"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                       Description:
                      <Input name="educations" 
                      data-index={educationIndex}
                      data-field="description"
                      placeholder="Description" 
                      value={updatedUserd.educations[educationIndex].description}
                      onChange={handleChange}
                      type= "textarea"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                      Period:
                      <Input name="educations" 
                      data-index={educationIndex}
                      data-field="startDate"
                      placeholder="Start date" 
                      value={updatedUserd.educations[educationIndex].startDate}
                      onChange={handleChange}
                      type= "Date"
                      />
                      <Input name="educations" 
                      data-index={educationIndex}
                      data-field="endDate"
                      placeholder="End Date" 
                      value={updatedUserd.educations[educationIndex].endDate}
                      onChange={handleChange}
                      type= "Date"
                      />
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </ModalBody>)}
              <ModalFooter>
              <Button color="primary" onClick={()=>{saveUser(updatedUserd); setIsEducationModal(false);}}>Save changes</Button>{' '}
            <Button color="secondary" onClick={()=>{cancelDetails(); setIsEducationModal(false);}}>Cancel</Button>
            </ModalFooter>
            </Modal>

           </div>
        </Container>
      </div>
      <DemoFooter />
    </>
    
  );
}
export default EditCondidatProfile;
