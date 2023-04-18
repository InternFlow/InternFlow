import React ,{useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert,FormGroup,Label,Input,ModalBody, ModalFooter,Modal,ModalHeader,Form,Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import { data,error } from "jquery";
import axios from "axios";
import OfferHeader from "components/Headers/OfferHeader";

// Importez votre image statique ici
import offerImage from "../uploads/offers/1681389235310-offers.jpg"
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function OfferDetails() {
  const idIntern = localStorage.getItem("id");

   //  const id = localStorage.getItem("id");
 //    console.log(id);
    const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL

    const [offer, setOffers] = useState([]); // initialiser à null
    const [selectedOffer, setSelectedOffer] = useState(null); // Nouvel état
    const [file, setFile] = useState(null);
    const [lettre, setLettre] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showButton, setShowButton] = useState();
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const history = useHistory();

    const [modalCv, setModalCv] = useState(false);
    const [modal, setModal] = useState(false);
    const openForm = () => setModal(!modal);
    const openFormCv = () => setModalCv(!modalCv);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedEducation, setSelectedEducation] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([]);
    const [description, setDescription] = useState('');
    const [showBoolean, setShowBoolean] = useState();
    const [userd, setUserData] = useState({});
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  console.log(offer);
    React.useEffect(() => {
    
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
            const id=id;
          
            const checkOffer = async () => {
              const response = await fetch(`http://localhost:5000/Candidacy/verifA?id=${id}&idO=${idIntern}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              const data = await response.json();
              setShowBoolean(data.success);
            };
    
            await checkOffer(); // Attendre que la fonction asynchrone soit terminée avant de passer à l'étape suivante
          })
          .catch(error => console.error(error));
      } 
    }, []);
    
    
  

    React.useEffect(() => {
    
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
            const checkOffer = async () => {
              const response = await fetch(`http://localhost:5000/Candidacy/verifA?id=${id}&idO=${idIntern}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              const data = await response.json();
              setShowBoolean(data.success);
            };
    
            await checkOffer(); // Attendre que la fonction asynchrone soit terminée avant de passer à l'étape suivante
          })
          .catch(error => console.error(error));
      } 
    }, []);
    
    


 
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

      const idP=id;
     history.push(`/showApply?param=${idP}`);
  
    }
    const handleSubmit = async (event,oui) => {
      event.preventDefault();
    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lettre", lettre);
      formData.append("offer", id);
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

const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter(skill => skill !== value));
    }
  };
  
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
    document.body.classList.add("landing-page");

    // appel de la fonction getOfferDetails pour récupérer l'offre avec l'id correspondant à partir de l'API
   

    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []); // met à jour l'effet à chaque fois que l'id change

  // useEffect(() => {
  //   if (id) { // add a check for the id parameter
  //     fetch(`${API}/Offer/displayOffer/${id}`, {
  //       credentials: 'include'
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       setOffers(data);
  //       // setSelectedOffer(data); // Set the fetched offer as the selected offer
  //       // console.log(setOffers(data));

  //     })      
  //     .catch(error => console.error(error));
  //   }
  // }, [id]);
  

  useEffect(()=> {
    axios.get(`http://localhost:5000/Offer/displayOffer/${id}`)
    .then((res)=>{
      setOffers(res.data);
    })
    .catch((err)=> {
      console.log("Error from OfferDetails");
    })
  }, [id]);
  
  






  return(
    <>
   <ExamplesNavbar />
      <OfferHeader />
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col md={4}>
          <br></br>
            <br></br>
            <br></br>
            <CardImg
              variant="top"
              // src={`../uploads/offers/${offer.image}`}
            //   src={`../../assets/uploads/offers/${offers.image}`}
              // src={offer.image}
              src={offerImage}
              alt="offer Img"
              height={330}
              width={250}
            />
          </Col>
          <Col md={8}>
          <Card className="mb-4"  key={offer._id}>
                  
          <CardBody>
                    <CardTitle tag="h2">
                      <center>
                      {offer.title}
                      </center>
                    </CardTitle>
                    <br></br>
                    <br></br>

                    <CardText className="h6">Type of Offer: {offer.type_offre} </CardText>                    
                    <CardText className="h6">Description: 
                    <br></br>
                    {offer.description} </CardText>
                    <CardText className="h6"> Availability: {offer.availability} </CardText>                    
                    <CardText className="h6">Duration: {offer.duration} </CardText>                    
                    <CardText className="h6">Location: {offer.location} </CardText>                    
                    <CardText className="h6">Requisted Languages:{offer.languages} </CardText>                    

                
                  </CardBody>
                </Card>
                <div>
                <Button color="primary" onClick={() => history.goBack()}>
              Go back
            </Button>
            <span style={{ marginRight: '120px' }} />

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

                  </Form>
                </div>
          </Col>
        </Row>
      </Container>
      
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
  )
  
}

export default OfferDetails;