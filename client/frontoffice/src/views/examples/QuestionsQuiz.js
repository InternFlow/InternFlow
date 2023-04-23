import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col, FormFeedback,
  Card,Alert,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
} from "reactstrap";
import CompanyNavbar from "components/Navbars/CompanyNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useLocation } from "react-router-dom";
import { data } from "jquery";

function QuestionsQuiz() {
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionChoices, setNewQuestionChoices] = useState("");
  const [newQuestionCorrectChoice, setNewQuestionCorrectChoice] = useState("");
  const [newQuestionScore, setNewQuestionScore] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [choicesList, setChoicesList] = useState([]);

  const [couleur, setcouleur] = useState("");


  const [namequiz, setnamequiz] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")


  const handleChoicesChange = (e) => {
    setNewQuestionChoices(e.target.value);
    const choices = e.target.value.split('\n').map(choice => choice.trim());
    const hasEmptyLine = choices.some(choice => choice === '');
    const hasDuplicate = new Set(choices).size !== choices.length;
    if (choices.length < 2 || hasEmptyLine || hasDuplicate) {
      setChoicesList([]);
      setNewQuestionCorrectChoice('');
    } else {
      setChoicesList(choices);
    }
  };


  useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const offreId = searchParams.get("ido");
    const quizId = searchParams.get("idq");
    if (!token) {
      history.push("/sign-in");
    } else {
      fetch(`http://localhost:5000/Quiz/offer/${offreId}/quizzes/${quizId}/questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Erreur serveur");
          }
        })
        .then((data) => {
          setQuestions(data.questions);
          setnamequiz(data.name)
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [history, location.search, token]);





  const handleAddQuestion = async () => {
    const searchParams = new URLSearchParams(location.search);
    const offreId = searchParams.get("ido");
    const quizId = searchParams.get("idq");
    const newQuestion = {
      text: newQuestionText,
      choices: newQuestionChoices.split("\n"),
      correctChoice: newQuestionCorrectChoice,
      score: newQuestionScore,
    };
    try {
        const response = await fetch(
            `http://localhost:5000/Quiz/offer/${offreId}/quiz/${quizId}/addquestion`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify(newQuestion),
            }
        );

        const data = await response.json();
        console.log(data);
        if(response.status==201){
            setQuestions([...questions, data]);
            console.log(data);


            console.log(data.message)
            setAlertMessage("question ajouter")
      setcouleur("success")
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000)


            setNewQuestionText("");
            setNewQuestionChoices("");
            setNewQuestionCorrectChoice("");
            setNewQuestionScore("");

        }
        else if(response.status==400)
        {
            console.log(data.message)
            setAlertMessage(data.message)
      setcouleur("danger")
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000)

        }
        // Réinitialiser les valeurs du formulaire

    } catch (error) {
        console.error(error);
    }
};

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <CompanyNavbar />
      <ProfilePageHeader />

      <Container className="mt--3" fluid>
  <Row>
    <Col className="ml-auto mr-auto" md="10">
      <Card className="card-plain">
        <CardHeader>
          <Row>
            <Col xs="8">
              <h1 className="profile-title text-left">les Questions de {namequiz}</h1>
            </Col>
            <Col xs="4">
              <Button
                className="btn-round float-right"
                color="primary"
                onClick={toggleForm}
              >
                {showForm ? "Annuler" : "Ajouter Question"}
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <>
            {questions.map((question) => (
              <div key={question._id}>
                <h4>{question.text}</h4>
                <ul>
                  {question.choices.map((choice, index) => (
                    <li key={index}>{choice}</li>
                  ))}
                </ul>
                <p>Choix correct : {question.correctChoice}</p>
                <p>Score : {question.score}</p>
              </div>
            ))}
          </>
          {showForm ? (
            <Form>
              <FormGroup>
                <Label for="text">Texte de la question</Label>
                <Input
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Texte de la question"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  required
                  minLength={10}
                />
              </FormGroup>
              <FormGroup>
                <Label for="choices">Choix (un par ligne)</Label>
                <Input
                  type="textarea"
                  name="choices"
                  id="choices"
                  placeholder="Choix"
                  value={newQuestionChoices}
                  onChange={handleChoicesChange}
                  required
                  pattern="^(.*\S+.*){5,}$"
                  onBlur={(e) => {
                    const choices = e.target.value.split('\n').map(choice => choice.trim());
                    const isEmptyLine = choices.some(choice => choice === '');
                    if (isEmptyLine) {
                      e.target.setCustomValidity("Les choix ne peuvent pas être vides");
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />
                {choicesList.length >= 2 && (
                  <FormGroup>
                    <Label for="select">Sélectionnez le choix correct:</Label>
                    <Input type="select" name="select" id="select" value={newQuestionCorrectChoice} onChange={(e) => setNewQuestionCorrectChoice(e.target.value)}>
                      {choicesList.map((choice, index) => (
                        <option key={index}>{choice}</option>
                      ))}
                    </Input>
                  </FormGroup>
                )}

                {choicesList.length === 0 && (
                  <FormFeedback>
                    Les choix doivent avoir au moins 5 caractères chacun.
                  </FormFeedback>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="score">Score</Label>
                <Input
                  type="number"
                  name="score"
                  id="score"
                  placeholder="Score"
                  value={newQuestionScore}
                  onChange={(e) => setNewQuestionScore(e.target.value)}
                  required
                  min={0}
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={handleAddQuestion}
                disabled={
                  !newQuestionText ||
                  !newQuestionChoices ||
                  !newQuestionCorrectChoice ||
                  !newQuestionScore
                }
                >
                Ajouter la question
                </Button>
                
                </Form>
                
                ) : null}

{showAlert && (
                      <Alert color={couleur}>{alertMessage}</Alert>
                    )}
                </CardBody>
                </Card>
                </Col>
                </Row>
                </Container>

      <DemoFooter />
    </>
  );
}
export default QuestionsQuiz;