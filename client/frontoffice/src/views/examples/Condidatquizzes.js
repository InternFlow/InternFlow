import React, { useState, useEffect } from "react";
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
  Input,
  Label,
  CardGroup,
  CardTitle,
  ListGroup,
  ListGroupItem,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import CondidatNavbar from "components/Navbars/CondidatNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory, useLocation } from "react-router-dom";

function Condidatquizzes() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const offerId = searchParams.get("ido");
  const [quizzes, setQuizzes] = useState([]);

  const [offer, setoffer] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [CompleteQuizzes, setCompleteQuizzes] = useState(false);

  const handleViewQuizzesClick = async (offerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/Candidacy/offer/condidat/${offerId}/quizzes`,
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

      if(response.status==200)
      {      
        setQuizzes(data);
        setShowQuizzes(true);
        console.log(data);

      }else if(response.status==400)
      {
console.log(data.message)
setCompleteQuizzes(true)
      }
   
    } catch (error) {
      console.error(error);
    }
  };


  const handleViewofferbyid = async (offerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/Quiz/offerbyid/${offerId}`,
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
      setoffer(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleViewQuizzesClick(offerId);
    handleViewofferbyid(offerId)
  }, [offerId]);

  return (
    <>
      <CondidatNavbar />
      <ProfilePageHeader />

      <div className="section profile-content">
      <Container>
        {CompleteQuizzes ? (
          <p>Vous avez terminé les quizzes pour cette offre.</p>
        ) : showQuizzes ? (
          <div>
            <h3 className="mb-4">Quizs de l'offre {offer.name}:</h3>
            <Table>
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>{quiz.name}</td>
                    <td className="text-right">
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() =>
                          history.push(
                            `/offre/condidat/questions?ido=${offerId}&quiz&idq=${quiz._id}`
                          )
                        }
                      >
                        Voir les questions
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>Chargement des quizs...</p>
        )}
      </Container>
      </div>
      <DemoFooter />
    </>
  );
}



export default Condidatquizzes;