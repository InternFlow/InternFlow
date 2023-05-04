
import React ,{useEffect, useState} from "react";
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
  ListGroupItem,
  Button,
  CardImg,
  Table,Form,FormGroup,Label,Input,Alert
} from "reactstrap";
import offerImage from "../uploads/offers/1681389235310-offers.jpg";
import ReactPaginate from "react-paginate";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import { API } from "config";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import OfferHeader from "components/Headers/OfferHeader";

function ListCAndidiesOffer() {
  const history = useHistory();
  const { id } = useParams();
const idd=id;
console.log(idd);
//ahmed
const [currentPage, setCurrentPage] = useState(0);

  const token = localStorage.getItem("token");
  const [offers, setOffers] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState(true);
  const itemsPerPage = 6;
  const offerId = selectedOfferId;
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [QuizScores, setQuizScores] = useState([]);
  const [selectedCandidate2, setSelectedCandidate2] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
console.log(alertMessage);
  const [newStatus, setNewStatus] = useState("pending");
  const [newStatus2, setNewStatus2] = useState("pending");
  const [couleur, setcouleur] = useState("");

  console.log(selectedCandidate);


  const handleViewCandidatesClick = async () => {
    try {
console.log(offerId);

      const response = await fetch(`http://localhost:5000/Candidacy/getListCandidaciesOffer/${id}/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      setCandidates(data);
      setSelectedOfferId(true);
    } catch (error) {
      console.error(error);
    }
  };


  const handlePlanInterview = (offerId, candidate) => {
    history.push(`/InterviewCompany?offerId=${idd}&candidateId=${candidate.intern._id}`);
  };





  const handleSave = async () => {

    
    try {
      const response = await fetch(`http://localhost:5000/Candidacy/offer/${idd}/users/${selectedCandidate.intern._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      console.log(response.status);
      console.log(selectedCandidate)
      console.log(response.status);
      if(response.status==200)
      {
          const updatedCandidates = candidates.map((candidate) => {
        if (candidate.intern === selectedCandidate.intern._id) {
          return { ...candidate, status: newStatus };
        }
        return candidate;
      });
      setCandidates(updatedCandidates); 
      setAlertMessage(data.message);
      setcouleur("success")
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000)
      
      }
      else if(response.status==400){
        const updatedCandidates = candidates.map((candidate) => {
          if (candidate.intern === selectedCandidate.intern._id) {
            return { ...candidate, status: candidate.status };
          }
          return candidate;
        });
        setCandidates(updatedCandidates); 

        setAlertMessage(data.error);
        setcouleur("danger")
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000)
      }
      // Mettre à jour l'état candidates après la modification du statut
   
      setSelectedCandidate(null);

    } catch (err) {
      console.error(err);
    }
    
  };
  

  
  const handleSave2 = async () => {

    console.log(newStatus2)

    try {
      const response = await fetch(`http://localhost:5000/Candidacy/offer/${idd}/users/${selectedCandidate2.intern._id}/statusQuiz`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({ statusQuiz: newStatus2 })
      });

      const data = await response.json();

      if(!data.error){
        const updatedCandidates1 = candidates.map((candidate) => {
          if (candidate.intern === selectedCandidate2.intern._id) {
            return { ...candidate, statusQuiz: newStatus2 };
          }
          return candidate;
        });
        console.log(updatedCandidates1)
        setCandidates(updatedCandidates1);
        setQuizScores([])
        setAlertMessage(data.message);
        setcouleur("success")
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000)

      }
      else{

        const updatedCandidates = candidates.map((candidate) => {
          if (candidate.intern === selectedCandidate2.intern._id) {
            return { ...candidate, statusQuiz: candidate.statusQuiz };
          }
          return candidate;
        });
        setCandidates(updatedCandidates);
        setQuizScores([])
  
        setAlertMessage(data.error);
        setcouleur("danger")
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000)
      }
      // Mettre à jour l'état candidates après la modification du statut

      setSelectedCandidate2(null)

      
    } catch (err) {
      console.error(err);
    }
  };

  

  
  
  const handleAnnuler = () => {
    setSelectedCandidate(null);
  };


  const handleAnnuler2 = () => {
    setQuizScores([]);

    setSelectedCandidate2(null);
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };
  const handlePremiereValidation = (candidate) => {
   // console.log(candidate)
    setSelectedCandidate(candidate);
  };

  const handleDeuxiemeValidation = async (candidate) => {
    setSelectedCandidate2(candidate);
console.log(selectedCandidate2);
    try {
      const response = await fetch(`http://localhost:5000/Candidacy/applications/${candidate.intern._id}/offers/${idd}/quiz-scores`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data.quizScores);
      setQuizScores(data.quizScores);
      setNewStatus2(candidate.statusQuiz);
    } catch (error) {
      console.error(error);
    }
  };



  React.useEffect(() => {
    if (!token) {
      history.push("/sign-in");
    } else {
      
      fetch(`http://localhost:5000/Candidacy/getListCandidaciesOffer/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setCandidates(data);
        })
        .catch((error) => console.error(error));
    }
  }, [history, token,candidates]);



//ahmed

  // const { id } = useParams(); // Récupère l'id de l'offre depuis l'URL



 // useEffect(()=>{
   // console.log("wa");
    //getListCandidaciesOffer()},[]);



  
  const r = (idP) => {

   history.push(`/showApply?param=${idP}`);

  }
  




  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });






  return (
    <>
    <ExamplesNavbar/>
      <OfferHeader />

      <div className="section profile-content" >
        <br></br>
       {/* <Container>
          <div className="owner">
           
          <Row >
          
            <Col md="9">
              <Row>
             {candidacies.map((candidacy) => (
                <Col md="4" key={candidacy._id}>
                <Card className="mb-4"  key={candidacy._id}>
                <CardImg top width="100%" src={offerImage} alt="Offer Image" />

                  <CardBody>
                    <CardTitle tag="h5">{candidacy.description}</CardTitle>
                    {new Date(candidacy.dateApply).toLocaleDateString()}
                    <p>{candidacy.description}</p>
                    <Button color="primary" onClick={() => history.push(`/ApplyPageOffer/${candidacy._id}`)}>
                      View Details
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              ))}  
              </Row>   
             
            
            </Col>

          </Row>

         

           </div>
             </Container> */}


             <Container>




             <Container>
          <h2 className="title">List of candidacies </h2>
          
          {selectedOfferId && (
            <Row>
              <Col>
                <Table className="align-items-center" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">StatusQuiz</th>
                      <th scope="col">Actions</th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody>
                    {candidates
                      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                      .map((candidate, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{candidate.intern.name}</td>
                            <td>{candidate.intern.email}</td>
                            <td>{candidate.status}</td>
                            <td>{candidate.statusQuiz}</td>
                           
                            <td>
                              {candidate.status === 'pending' && candidate.statusQuiz === 'pending' && (
                                <Button color="primary" onClick={() => handlePremiereValidation(candidate)}>
                                  First Validation
                                </Button>
                              )}
                              {candidate.status === 'approved' && candidate.statusQuiz === 'pending' && (
                                <Button color="primary" onClick={() => handleDeuxiemeValidation(candidate)}>
                                  Seconde Validation
                                </Button>
                              )}
                                 {candidate.status === 'approved' && candidate.statusQuiz === 'approved' && (
                                <Button color="primary" onClick={() => handlePlanInterview(offerId, candidate)} >
                                  Schedule an interview
                                </Button>
                              )}
                            </td>
                            <td>
                            <Button color="primary" onClick={() => handlePlanInterview(offerId, candidate)} >
                                  Consult the apply
                                </Button>
                            </td>
                          </tr>
                          {selectedCandidate && selectedCandidate.intern.email === candidate.intern.email && (
                            <tr>
                              <td colSpan="6">
                                <Form>
                                  <FormGroup>
                                    <Label for="status"> <strong>Nouvel Statut :</strong></Label>
                                    <Input
                                      type="select"
                                      name="status"
                                      id="status"
                                      value={newStatus}
                                      onChange={(e) => setNewStatus(e.target.value)}

                                    >
                                      <option value="pending" defaultValue>pending</option>
                                      <option value="approved" >Accepté</option>
                                      <option value="rejected">Refusé</option>
                                    </Input>
                                  </FormGroup>
                                  <Button color="primary" onClick={handleSave}>
                                    Enregistrer
                                  </Button>{"    "}
                                  <Button color="secondary" onClick={handleAnnuler}>
                                    Annuler
                                  </Button>
                                </Form>
                              </td>
                            </tr>
                          )}

                          {selectedCandidate2 &&QuizScores && selectedCandidate2.intern.email === candidate.intern.email && (
                            <tr>
                              <td colSpan="6">
                                <Form>
                                  <FormGroup>
                                    {QuizScores && (
                                      <div>
                                        <Label for="quiz-scores"><strong>Scores des quizs:</strong></Label>
                                        {QuizScores.map((quizScore) => (
                                          <div key={quizScore._id}>
                                            <span>{quizScore.name}: </span>
                                            <span className="ml-1 font-weight-bold">{quizScore.score}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </FormGroup>
                                  <FormGroup>
                                    <Label for="statusQuiz"><strong>Nouveau statut après les quizs:</strong></Label>
                                    <Input
                                      type="select"
                                      name="statusQuiz"
                                      id="statusQuiz"
                                      value={newStatus2}
                                      onChange={(e) => setNewStatus2(e.target.value)}
                                    >
                                      <option value="pending" defaultValue>pending</option>

                                      <option value="approved" >Accepté</option>
                                      <option value="rejected">Refusé</option>
                                    </Input>
                                  </FormGroup>
                                  <Button color="primary" onClick={handleSave2}>
                                    Enregistrer
                                  </Button>
                                  <Button color="secondary" onClick={handleAnnuler2} className="ml-2">
                                    Annuler
                                  </Button>
                                </Form>
                              </td>
                            </tr>
                          )}




                        </React.Fragment>
                      ))}
                  </tbody>
                </Table>

                <ReactPaginate
                  previousLabel={<BsLine />}
                  nextLabel={<BsLine />}
                  breakLabel={"..."}
                  pageCount={Math.ceil(candidates.length / itemsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={({ selected }) => setCurrentPage(selected)}
                  containerClassName={"pagination justify-content-center"}
                  activeClassName={"active"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  nextClassName={"page-item next"}
                  nextLinkClassName={"page-link"}
                  previousClassName={"page-item previous"}
                  previousLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                />


              </Col>
            </Row>
          )}


{showAlert && (
                      <Alert color={couleur}>{alertMessage}</Alert>
                    )}

        </Container>





             </Container>
      </div>
      <DemoFooter />
    </>
  );
}


export default ListCAndidiesOffer;