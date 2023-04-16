import React, { useState } from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    CardBody,
    Table,
    Form,
    FormGroup,
    Input,Alert,
    Label,
    CardGroup,
    CardTitle,
    ListGroup,
    ListGroupItem,
    CardSubtitle,
    CardText,
    Button,
} from "reactstrap";

// core components
import CompanyNavbar from "components/Navbars/CompanyNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from "components/Accordion";
import ReactPaginate from "react-paginate";

function OfferCompany() {
    const [currentPage, setCurrentPage] = useState(0);
    const id = localStorage.getItem("id");
    const history = useHistory();
    const token = localStorage.getItem("token");
    const [offers, setOffers] = useState([]);
    const [showQuizForm, setShowQuizForm] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [showQuizzes, setShowQuizzes] = useState(false);
    const itemsPerPage = 6;

    const [couleur, setcouleur] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")



    const offerId = selectedOfferId;
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const [quizData, setQuizData] = useState({
        name: "",
        coefficient: "",
        timeout: "",
    });
    const handleAddQuizClick = (offerId) => {
        setSelectedOfferId(offerId);
        setShowQuizForm(true);
    };



    const handleViewQuestionsClick = (offerId, quizId) => {
        history.push(`offres?ido=${offerId}&idq=${quizId}&questions`);
      };
      
   
    const handleViewQuizzesClick = async (offerId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/applicationquiz/offer/${offerId}/quizzes`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                }
            );
            const data = await response.json();
            console.log(data);
            setQuizzes(data);
            setShowQuizzes(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleQuizFormSubmit = async (e) => {
        e.preventDefault();

        console.log(quizData);
        try {
            const response = await fetch(
                `http://localhost:5000/Quiz/addquiztooffer/${offerId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(quizData),
                    credentials: "include",
                }
            );

            const data = await response.json();
            console.log(data);
            if(response.status==201){
                console.log(data);
                setQuizData({
                    name: "",
                    coefficient: "",
                    timeout: "",
                });
                setShowQuizForm(false);
    
                alert(data.message);

            }
            else if(response.status==400)
            {
                console.log(data);
                setQuizData({
                    name: "",
                    coefficient: "",
                    timeout: "",
                });
            //    setShowQuizForm(false);
    
                setAlertMessage(data.error)
      setcouleur("danger")
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000)
          setShowQuizForm(false);

            }
            // Réinitialiser les valeurs du formulaire

        } catch (error) {
            console.error(error);
            alert("Une erreur s'est produite lors de l'ajout du quiz.");
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
            fetch("http://localhost:5000/applicationquiz/offers/my-offers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setOffers(data);
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
                                                <Button color="primary" onClick={() => handleAddQuizClick(offer._id)}
                                                >
                                                    Ajouter un quiz
                                                </Button>
                                                <Button color="secondary" onClick={() => handleViewQuizzesClick(offer._id)}
                                                >
                                                    Voir Quizs
                                                </Button>
                                            </div>

                                            
                                        </CardBody>

                                        
                                        {showQuizzes && (
                                            <CardBody>
                                                <CardTitle tag="h5">Quiz</CardTitle>
                                                {quizzes.length === 0 ? (
                                                    <p>Aucune question pour le moment.</p>
                                                ) : (
                                                    <Table responsive>
                                                        <thead>
                                                            <tr>
                                                                <th>No.</th>
                                                                <th>Nom</th>
                                                                <th>Coefficient</th>
                                                                <th>Timeout</th>
                                                                <th>Score maximal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {quizzes
                                                                .slice(
                                                                    currentPage * itemsPerPage,
                                                                    (currentPage + 1) * itemsPerPage
                                                                )
                                                                .map((quiz, index) => (
                                                                    <tr key={quiz._id}>
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td>{quiz.name}</td>
                                                                        <td>{quiz.coefficient}</td>
                                                                        <td>{quiz.timeout}</td>
                                                                        <td>{quiz.scoremax}</td>

                                                                        <td> <Button color="secondary" onClick={() => handleViewQuestionsClick(offer._id, quiz._id)}>
                                                                            Voir Questions
                                                                        </Button></td>


                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                        <ReactPaginate previousLabel={"Précédent"} nextLabel={"Suivant"} breakLabel={"..."} breakClassName={"break-me"} pageCount={Math.ceil(quizzes.length / itemsPerPage)} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                                                    </Table>
                                                )}
                                                <div className="d-flex justify-content-end">
                                                    <Button color="secondary" onClick={() => setShowQuizzes(false)}
                                                    >
                                                        Fermer
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        )}
                                    </Card>
                                </Col>
                                {index % 2 === 0 && (
                                    <Col lg="6">
                                        <div className="mb-4">
                                            {showQuizForm && selectedOfferId === offer._id && (
                                                <Card>
                                                    <CardBody>
                                                        <Form onSubmit={handleQuizFormSubmit}>
                                                            <FormGroup>
                                                                <Label for="quizName">Nom du quiz</Label>
                                                                <Input type="text" id="quizName" name="name" value={quizData.name} onChange={handleInputChange} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="quizCoefficient">Coefficient</Label>
                                                                <Input type="number" id="quizCoefficient" name="coefficient" value={quizData.coefficient} onChange={handleInputChange} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="quizTimeout">
                                                                    Délai (en secondes)
                                                                </Label>
                                                                <Input type="number" id="quizTimeout" name="timeout" value={quizData.timeout} onChange={handleInputChange} />
                                                            </FormGroup>
                                                            <div className="d-flex justify-content-between">
                                                                <Button type="submit">Ajouter</Button>
                                                                <Button color="secondary" onClick={() => setShowQuizForm(false)}
                                                                >
                                                                    Annuler
                                                                </Button>
                                                            </div>
                                                        </Form>
                                                        {showAlert && (
                      <Alert color={couleur}>{alertMessage}</Alert>
                    )}
                                                    </CardBody>
                                                </Card>
                                            )}
                                        </div>
                                    </Col>
                                )}
                            </React.Fragment>
                        ))}
                    </Row>
                </Container>
            </div>
            <DemoFooter />
        </>
    );
}

export default OfferCompany;