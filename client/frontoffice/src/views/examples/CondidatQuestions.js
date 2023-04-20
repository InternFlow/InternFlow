import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card, Button,
  CardHeader,
  CardBody,
  FormGroup,Alert,
  Input, Label

} from "reactstrap";
import CondidatNavbar from "components/Navbars/CondidatNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useLocation } from "react-router-dom";
import { Question } from "react-bootstrap-icons";

function CondidatQuestions() {
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionChoices, setNewQuestionChoices] = useState("");
  const [newQuestionCorrectChoice, setNewQuestionCorrectChoice] = useState("");
  const [newQuestionScore, setNewQuestionScore] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [offer, setOffer] = useState({});

  const [Countdown, setCountdown] = useState(null);
  const [timerId, setTimerId] = useState(null);



  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [tempup, settempup] = useState(false);


const [answers, setAnswers] = useState(Array.from({length: questions.length}, () => ''));
  
const [couleur, setcouleur] = useState("");



  useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const offerId = searchParams.get("ido");
    const quizId = searchParams.get("idq");
    if (!token) {
      history.push("/sign-in");
    } else {

      fetch(
        `http://localhost:5000/Quiz/offer/condidat/${offerId}/quizzes/${quizId}/questions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      )//        setCountDown(data.timeout);

        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Failed to fetch questions");
          }
        })
        .then((data) => {
          setQuestions(data);
        })
        .catch((error) => {
          console.log(error);
        });

      fetch(`http://localhost:5000/Quiz/offer/condidat/${offerId}/quizzes/${quizId}`, {
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
            throw new Error("Failed to fetch offer");
          }
        })
        .then((data) => {
          
          setOffer(data);
          setCountdown(data.timeout * 60); // Convertir en secondes

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);





  const handleAnswerChange = (questionIndex, answerIndex) => {
  const newAnswers = [...answers];
  newAnswers[questionIndex] = questions[questionIndex].choices[answerIndex];
  setAnswers(newAnswers);

  const radioButtons = document.getElementsByName(`question-${questionIndex + 1}`);
  radioButtons.forEach((button, index) => {
    button.defaultChecked = (index === answerIndex);
  });
};




useEffect(() => {
  const timer = setInterval(() => {
    setCountdown(countdown => {
      if (countdown > 0) {
        return countdown - 1;
      } else {
        clearInterval(timer); // Arrêter le minuteur
        return 0;
      }
    });
  }, 1000);

  return () => clearInterval(timer);
}, [Countdown]);

useEffect(() => {
  if ( Countdown===1190) {
    // Envoyer les données ici
handleSubmit();

  }}, [Countdown]);


const handleSubmit = () => {
  const searchParams = new URLSearchParams(location.search);

  const offerId = searchParams.get("ido");
  const quizId = searchParams.get("idq");
  console.log(quizId);
  fetch(`http://localhost:5000/Candidacy/offer/${offerId}/quiz/${quizId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers }),

    credentials: "include",
  })
    .then((res) => {
      
        return res.json();
      
    })
    .then((data) => {
      console.log(data)
      setOffer(data);
if(data.error)
{
  setAlertMessage(data.error);
  setcouleur("danger")
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        history.push(`/quizzes/offres/condidat?ido=${offerId}`)
      }, 3000);
}
else
{
  setAlertMessage("vos repenses bien");
  setcouleur("success")
  setShowAlert(true);
  setTimeout(() => {
    setShowAlert(false);
    history.push(`/quizzes/offres/condidat?ido=${offerId}`)
  }, 3000);
}


    })
    .catch((error) => {
      console.log(error);
    });  
};

  return (
    <>
      <CondidatNavbar />
      <ProfilePageHeader />
      <Container className="mt-19">
        <Row>
          <Col className="ml-auto mr-auto" md="10">
            <Card>
              <CardHeader>
                <div className="text-center">
                {Countdown > 0 ? (
                    <h4>Remaining Time: {Math.floor((Countdown+60) / 60) - 1} minutes {((Countdown+60) % 60)} seconds</h4>
                  ) : (
                    <h4>Time is up!</h4>
                  )}
                </div>
              </CardHeader>
              <CardBody>
              <div>
      {questions.map((question, index) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          <div>
            {question.choices.map((choice, choiceIndex) => (
              <div key={choiceIndex}>
                <input
                  type="radio"
                  value={choiceIndex}
                  checked={answers[index] === choice}
                  onChange={() => handleAnswerChange(index, choiceIndex)}
                />
                <label>{choice}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
                <Button color="primary" onClick={handleSubmit}>Envoyer</Button>
    </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {showAlert && (
                      <Alert color={couleur}>{alertMessage}</Alert>
                    )}
      </Container>
      <DemoFooter />

    </>
  );
}

export default CondidatQuestions;