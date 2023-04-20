import React, { useState, useEffect } from "react";
import { useHistory ,useParams} from 'react-router-dom';
// reactstrap components
import { Button,  Modal, ModalHeader,FormGroup,Label,
   ModalBody, ModalFooter,Card, Form, Input, Container, Row, Col, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import "./style.css"; // Ajout du fichier CSS pour la bordure bleue
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCheckCircle,faCompany, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {faBuilding,faUserTie,faSchool,faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
// core components
import LoginNavbar from "components/Navbars/LoginNavBar";
function RegisterPage() {
  const idIntern = localStorage.getItem("id");
  console.log(idIntern);
  const [modalCv, setModalCv] = useState(false);
  const [modal, setModal] = useState(false);
  const openForm = () => setModal(!modal);
  const openFormCv = () => setModalCv(!modalCv);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [description, setDescription] = useState('');
  const [showBoolean, setShowBoolean] = useState();
  const [selectedButton, setSelectedButton] = useState(false); // ajout d'une variable d'état pour suivre la sélection de la première button
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [userd, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const [verif, setVerif] = useState(false);
  const [showButton, setShowButton] = useState();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  React.useEffect(() => {
    console.log("2")
  
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
        .then(async (data) => {
          const userData = data.user;
          setUserData(userData);
          const id="6427630a74b2a35eac2c802b";
        
          const checkOffer = async () => {
            console.log(idIntern)
            const response = await fetch(`http://localhost:5000/Candidacy/verifA?id=${id}&idO=${idIntern}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const data = await response.json();
            setShowBoolean(data.success);
            console.log(data.success);
          };
  
          await checkOffer(); // Attendre que la fonction asynchrone soit terminée avant de passer à l'étape suivante
        })
        .catch(error => console.error(error));
    } 
  }, []);
  
  


    /*React.useEffect(() => { 
      const id='npm ';
      if (Array.isArray(userd?.OfferId) && userd.OfferId.includes(id)) {
        setShowButton(false);
      } else {
        setShowButton(true);
  
      }
      

    },[])
*/

   // console.log(file);



    const handleSubmit = async (event,oui) => {
      console.log(oui);
      event.preventDefault();
    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lettre", lettre);
      formData.append("offer", "6427630a74b2a35eac2c802b");
      formData.append("intern", localStorage.getItem("id"));
      formData.append("selectedExperience",  JSON.stringify(selectedExperience));
      formData.append("selectedEducation",  JSON.stringify(selectedEducation));
      formData.append("selectedSkills",  JSON.stringify(selectedSkills));
      formData.append("description", description);
      formData.append("oui", oui);
      try {

        const response = await fetch("http://localhost:5000/Candidacy/apply", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
    
        setAlertMessage("Registration successful!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          history.push("/profile-page");
        }, 2000);
      } catch (error) {
        setShowAlert(true);
      }
    };
    
    
  const handleClick= () => {

    setIsSelected(true);
    setIsSelected2(false);

  }
  const handleClick2= () => {
    setIsSelected(false);

    setIsSelected2(true);
  }

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  const [lettre, setLettre] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('company');
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState(userd.skills);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter(skill => skill !== value));
    }
  };

 
  function handleCheckboxChangeeducations(event) {
    const educationId = event.target.id;
    const education = userd.educations.find(e => e._id === educationId);
    const updatedEducations = event.target.checked 
      ? [...selectedEducation, education] 
      : selectedEducation.filter(e => e._id !== educationId);
    setSelectedEducation(updatedEducations);
  }
  function handleCheckboxChangeexperieneces(event) {
    const experienceId = event.target.id;
    const experience = userd.experiences.find(a => a._id === experienceId);
    const updatedExperiences = event.target.checked 
      ? [...selectedExperience, experience] 
      : selectedExperience.filter(a => a._id !== experienceId);
    setSelectedExperience(updatedExperiences);
  }
  const redirect = () => {

    const id='6427630a74b2a35eac2c802b';
   history.push(`/showApply?param=${id}`);

  }

  return (
    <>
      <LoginNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/company.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto"> Apply for this offer :</h3>
                <div>
                  {showButton}  
                  <Form onSubmit={handleSubmit} className="register-form" method="POST">
             
                  {showBoolean==false && (
        <Button color="primary" onClick={openForm}>
          Apply
        </Button>
      )}
                {showBoolean==true && (
        <Button color="primary" onClick={redirect}>
          Consult your apply
        </Button>
      )}

                    {showAlert && (
                      <Alert color="success">{alertMessage}</Alert>
                    )}
                  </Form>
                </div>
            
              </Card>
            </Col>
          </Row>
        </Container>
    
      </div>


      <div>
      <Modal isOpen={modal} toggle={openForm}>
        <ModalHeader toggle={openForm}>Apply for this offer</ModalHeader>
        <ModalBody>
          <Form>
          <Button color="danger" className={`oui mb-2 mr-3 ${isSelected ? "selected" : ""}`} 

          onClick={() => handleClick()}>

              <div>CV general</div>
            </Button>
          <Button  className={`oui mb-2 mr-3 ${isSelected2 ? "selected" : ""}`} onClick={() => {
  openFormCv();
  handleClick2();
}}>
          <div>cv specefique</div>
          </Button>
            <FormGroup>
              <Label for="lettre">Lettre de motivation</Label>
              <Input type="textarea" value={lettre} name="lettre" id="lettre" placeholder="Lettre"
                                      onChange={e => setLettre(e.target.value)}
                                      />
            </FormGroup>
          </Form>
          {showAlert && (
                      <Alert color="success">{alertMessage}</Alert>
                    )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(event) => handleSubmit(event,"gen")} type="submit">Enregistrer</Button>
          <Button color="secondary" >Annuler</Button>
        </ModalFooter>
      </Modal>

      
    </div>

    <div>
      <Modal isOpen={modalCv} toggle={openFormCv}>
        <ModalHeader toggle={openFormCv}>CV specefiquee</ModalHeader>
        <ModalBody>
          <Form>
          
          <FormGroup>
              <Label for="lettre">Lettre de motivation</Label>
              <Input type="textarea" value={lettre} name="lettre" id="lettre" placeholder="Lettre"
                                      onChange={e => setLettre(e.target.value)}
                                      />
            </FormGroup>
          <FormGroup>
              <Label for="lettre">Description :</Label>
              <Input type="textarea" value={description} name="lettre" id="lettre" placeholder={userd.description}
                                      onChange={e => setDescription(e.target.value)}
                                      />
            </FormGroup>
            <FormGroup>
<h3> Skills: </h3>
            {userd && userd.skills && userd.skills.map((name, index) => (
  <div key={index}>
    <input type="checkbox" id={`skill_${index}`} name={`skill_${index}`} value={name} 
    onChange={handleCheckboxChange} />
    <label htmlFor={`skill_${index}`}>{name}</label>
  </div>
))}
            </FormGroup>
         

            <FormGroup>
            <h3> Educatns: </h3>

            {userd && userd.educations && userd.educations.map((education, index) => (
  <div key={education._id}>
    <input type="checkbox" id={education._id} name={education._id} value={education} 
    onChange={handleCheckboxChangeeducations} />
    <label htmlFor={`skill_${index}`}>{education.schoolName}{education.degree}</label>
  </div>
))}
            </FormGroup>

            <FormGroup>
<h3> experiences: </h3>
            {userd && userd.experiences && userd.experiences.map((experience, index) => (
  <div key={experience._id}>
    <input type="checkbox" id={experience._id} name={experience._id} value={experience} 
    onChange={handleCheckboxChangeexperieneces} />
    <label htmlFor={`skill_${index}`}>{experience.jobTitle}</label>
  </div>
))}
            </FormGroup>
<FormGroup>
            <input type="file" onChange={handleFileChange} />
            </FormGroup>
          </Form>


      
          {showAlert && (
                      <Alert color="success">{alertMessage}</Alert>
                    )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(event) => handleSubmit(event,"spec")}  type="submit">Enregistrer</Button>
          <Button color="secondary" >Annuler</Button>
        </ModalFooter>
      </Modal>

      
    </div>
    </>
  );
}

export default RegisterPage;
