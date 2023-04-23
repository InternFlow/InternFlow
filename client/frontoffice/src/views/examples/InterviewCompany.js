import React, { useState, useRef, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
    Alert,
    Label,
    CardGroup,
    CardTitle,
    ListGroup,
    ListGroupItem,
    CardSubtitle,
    CardText,
    Button,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FaEnvelope } from "react-icons/fa";

import { useHistory, useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import MapTunisie from "components/Maps/MapTunisie.js"

// core components
import CompanyNavbar from "components/Navbars/CompanyNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { BsLine } from "react-icons/bs";
import Accordion from "components/Accordion";
import ReactPaginate from "react-paginate";
import moment from "moment-timezone";

const localizer = momentLocalizer(moment);

function InterviewCompany() {
    const location = useLocation();
    const history = useHistory();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const token = localStorage.getItem("token");
    const searchParams = new URLSearchParams(location.search);
    const offerId = searchParams.get("offerId");
    const userId = searchParams.get("candidateId");


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [couleur, setcouleur] = useState("");


    const [showNotificationButton, setShowNotificationButton] = useState(false);

    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        duration: "",
        location: "",
    });


    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const center = {
        lat: 37.7749,
        lng: -122.4194,
    };


    const getEventStyle = (event, start, end, isSelected) => {
        const backgroundColor = event.isuser === userId ? "red" : "blue"; // Définir la couleur de fond en fonction de l'ID de l'utilisateur

        return {
            style: {
                backgroundColor,
                borderRadius: "0px",
                opacity: 0.8,
                color: "white",
                border: "0px",
                display: "block",
            },
        };
    };



    React.useEffect(() => {
        if (!token) {
            history.push("/sign-in");
        } else {
            fetch(
                `http://localhost:5000/userinterview/offer/${offerId}/applications/interview-scheduled`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    const formattedEvents = data.map((item) => {
                        const title = `Entretien pour le candidat ${item.user.name}`;
                        const start = moment(item.interviewScheduled.date)
                            .subtract(1, "hours")
                            .toDate();
                        const end = moment(item.interviewScheduled.date)
                            .add(item.interviewScheduled.duration, "minutes")
                            .subtract(1, "hours")
                            .toDate();
                        const isuser = item.user._id;

                        return {
                            title,
                            start,
                            end,
                            isuser,
                        };
                    });

                    setEvents(formattedEvents);
                })
                .catch((error) => console.error(error));
        }
    }, [history, token, events]); // Ajouter events comme dépendance








    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSendNotification = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/userinterview/notify/${userId}/interview/${offerId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ interviewDate: formData.date }),
                    credentials: "include",
                }
            );

            const responseData = await response.json();

            console.log("Success:", responseData);

            if (response.status === 200) {
                setcouleur("success");
                setAlertMessage("Notification envoyée");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);

                }, 6000)
                setShowNotificationButton(false)

                setShowForm(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setcouleur("danger");
            setAlertMessage("Une erreur s'est produite");
            setShowAlert(true);
        }
    };



    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const data = {
            date: formData.date,
            time: formData.time,
            duration: formData.duration,
            location: formData.location,
        };

        const updatedEvents = events.map((event) => {
            console.log(event.isuser);
            if (event.isuser === userId) {
                return {
                    ...event,
                    start: moment(data.date)
                        .subtract(1, "hours")
                        .toDate(),
                    end: moment(`${data.date}T${data.time}`)
                        .add(data.duration, "minutes")
                        .subtract(1, "hours")
                        .toDate(),
                };
            }
            return event;
        });

        setEvents(updatedEvents);

        try {
            const response = await fetch(
                `http://localhost:5000/userinterview/offer/${offerId}/user/${userId}/application`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                    credentials: "include",
                }
            );

            const responseData = await response.json();

            console.log("Success:", responseData);

            if (response.status === 200) {

                setEvents(updatedEvents);
                setcouleur("success")
                setAlertMessage("entretien ajouter ")
                setShowAlert(true);
                setShowNotificationButton(true); // Ajouter cette ligne pour afficher le bouton

                setTimeout(() => {
                    setShowAlert(false);

                }, 3000)

            }
            else if (response.status === 401) {
                setAlertMessage(responseData.error);
                setcouleur("danger")
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);

                }, 3000)
                setShowForm(false);

            }

        } catch (error) {
            console.error("Error:", error);
        }

    };



    const handleCloseChat = () => {
        setIsChatOpen(false);
    };


    const handleOpenChat = async (id) => {
        setIsChatOpen(true);
        
    };

    return (
        <>
            <CompanyNavbar />
            <ProfilePageHeader />

            <div className="section profile-content">
                <Container>
                    <h2 className="title mb-4">Calendrier des entretiens</h2>
                    <hr className="my-4" />

                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        selectable
                        eventPropGetter={getEventStyle}
                    />

                    <hr className="my-4" />
                    <Modal isOpen={isChatOpen} toggle={handleCloseChat}>
                        <ModalHeader toggle={handleCloseChat}>Messagerie</ModalHeader>
                        <ModalBody>
                            <ul className="messages-list">
                               
                            </ul>


                            <Input
                                type="text"
                                placeholder="Écrire un nouveau message"
                               
                            />
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex">
                         
                                <Button color="primary" >
                                    Envoyer
                                </Button>
                            </div>
                            <Button color="secondary" onClick={handleCloseChat}>
                                Fermer
                            </Button>
                        </ModalFooter>

                    </Modal>
                    <div className="d-flex justify-content-between">
                    <Button color="primary" onClick={() => handleOpenChat()}>
                                        <FaEnvelope className="mr-2" />
                                        Messagerie
                                    </Button>
                        <Button color="primary" onClick={() => setShowForm(true)}>
                            <FaCalendarAlt className="mr-2" />
                            Nouvelle date d'entretien
                        </Button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="date">Date:</Label>
                                <Input type="date" name="date" id="date" value={formData.date} onChange={handleFormChange} min={new Date().toISOString().split('T')[0]} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="time">Heure:</Label>
                                <Input type="time" name="time" id="time" value={formData.time} onChange={handleFormChange} min="08:00" max="21:00" required />
                            </FormGroup>

                            <FormGroup>
                                <Label for="duration">Durée (en minutes):</Label>
                                <Input type="number" name="duration" id="duration" value={formData.duration} onChange={handleFormChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Lieu:</Label>
                                <Input type="text" name="location" id="location" value={formData.location} onChange={handleFormChange} requirblanked />
                            </FormGroup>
                            <Button type="submit">Enregistrer</Button>
                        </form>
                    )}

                    {showAlert && (
                        <Alert color={couleur}>{alertMessage}</Alert>
                    )}

                    {showNotificationButton && (
                        <button
                            onClick={handleSendNotification}
                        >
                            Informer le candidat
                        </button>
                    )}



                </Container>
            </div>
        <DemoFooter />

        </>
    );
}

export default InterviewCompany;
