import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  Table,
  Form,
  FormGroup,
  Input,
  Label,
  CardTitle,
Alert,
  Button,
} from "reactstrap";
import CompanyNavbar from "components/Navbars/CompanyNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from "components/Accordion";
import ReactPaginate from "react-paginate";

function ApplicationCondidate() {
  const [currentPage, setCurrentPage] = useState(0);
  const id = localStorage.getItem("id");
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [offers, setOffers] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const itemsPerPage = 6;
  const offerId = selectedOfferId;
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [QuizScores, setQuizScores] = useState([]);
  const [selectedCandidate2, setSelectedCandidate2] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [newStatus, setNewStatus] = useState("pending");
  const [newStatus2, setNewStatus2] = useState("pending");

  const [couleur, setcouleur] = useState("");




  const handleViewCandidatesClick = async (offerId) => {
    try {
      const response = await fetch(`http://localhost:5000/applicationquiz/offer/${offerId}/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      setCandidates(data.users);
      console.log(data.users);
      setSelectedOfferId(offerId);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSave = async () => {

    
    try {
      const response = await fetch(`http://localhost:5000/applicationquiz/offer/${offerId}/users/${selectedCandidate.user._id}/status`, {
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
      if(response.status==200)
      {
          const updatedCandidates = candidates.map((candidate) => {
        if (candidate.user._id === selectedCandidate.user._id) {
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
          if (candidate.user._id === selectedCandidate.user._id) {
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

    ///console.log(newStatus2)

    try {
      const response = await fetch(`http://localhost:5000/applicationquiz/offer/${offerId}/users/${selectedCandidate2.user._id}/statusQuiz`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({ statusQuiz: newStatus2 })
      });

      const data = await response.json();
console.log(data)

      if(!data.error){
        const updatedCandidates1 = candidates.map((candidate) => {
          if (candidate.user._id === selectedCandidate2.user._id) {
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
          if (candidate.user._id === selectedCandidate2.user._id) {
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
      const response = await fetch(`http://localhost:5000/applicationquiz/applications/${candidate.user._id}/offers/${offerId}/quiz-scores`, {
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
    document.documentElement.classList.remove("nav-open");
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []);

  React.useEffect(() => {
    if (!token) {
      history.push("/sign-in");
    } else {
      fetch("http://localhost:5000/applicationquiz/offers-with-applications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setOffers(data.offers);
        })
        .catch((error) => console.error(error));
    }
  }, [history, token]);

  return (
    <>
      <CompanyNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <h2 className="title">Mes offres d'emploi</h2>
          <Row>
            {offers.map((offer, index) => (
              <React.Fragment key={offer._id}>
                <Col lg="6">
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle tag="h5">{offer.name}</CardTitle>
                      <div className="d-flex justify-content-between">
                        <Button
                          color="secondary"
                          onClick={() => handleViewCandidatesClick(offer._id)}
                        >
                          Voir candidats
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </Row>
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
                    </tr>
                  </thead>
                  <tbody>
                    {candidates
                      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                      .map((candidate, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{candidate.user.name}</td>
                            <td>{candidate.user.email}</td>
                            <td>{candidate.status}</td>
                            <td>{candidate.statusQuiz}</td>
                           
                            <td>
                              {candidate.status === 'pending' && candidate.statusQuiz === 'pending' && (
                                <Button color="primary" onClick={() => handlePremiereValidation(candidate)}>
                                  Première validation
                                </Button>
                              )}
                              {candidate.status === 'approved' && candidate.statusQuiz === 'pending' && (
                                <Button color="primary" onClick={() => handleDeuxiemeValidation(candidate)}>
                                  Deuxième validation
                                </Button>
                              )}
                                 {candidate.status === 'approved' && candidate.statusQuiz === 'approved' && (
                                <Button color="primary" >
                                  plannifier un entretien
                                </Button>
                              )}
                            </td>
                          </tr>
                          {selectedCandidate && selectedCandidate.user.email === candidate.user.email && (
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

                          {selectedCandidate2 &&QuizScores && selectedCandidate2.user.email === candidate.user.email && (
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
      </div>
      <DemoFooter />
    </>
  );
}
export default ApplicationCondidate;