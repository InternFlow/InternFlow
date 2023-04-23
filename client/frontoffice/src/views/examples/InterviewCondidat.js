import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
    Container,
    Card, Input,
    CardBody,
    CardText,
    CardSubtitle,
    CardTitle,
    Button,
} from "reactstrap";


import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import QRCode from "react-qr-code";

import { useHistory, useLocation } from "react-router-dom";
import moment from "moment-timezone";
import CondidatNavbar from "components/Navbars/CondidatNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { FaEnvelope } from "react-icons/fa";
import io from "socket.io-client";
const iduserconnecter = localStorage.getItem("id");


const localizer = momentLocalizer(moment);

function InterviewCondidat() {
    const location = useLocation();
    const history = useHistory();
    const token = localStorage.getItem("token");

    const [events, setEvents] = useState([]);
    const [applications, setapplications] = useState([]);

    const [messages, setMessages] = useState([]);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [selectedcomanyid, setselectedcomanyid] = useState();

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };


    

    console.log(selectedcomanyid)


    const handleOpenChat = async (id) => {
        setIsChatOpen(true);
       
      };




    useEffect(() => {
        if (!token) {
            history.push("/sign-in");
        } else {
            fetch(
                `http://localhost:5000/userinterview/applications/interview-scheduled`,
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
                        const title = `Entretien pour le offre ${item.offer.name}`;
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
                    setapplications(data);
                })
                .catch((error) => console.error(error));
        }
    }, [history, token]);

    return (
        <>
            <CondidatNavbar />
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
                    />

                    <h2 className="title mb-4">Liste des entretiens</h2>
                    <hr className="my-4" />

                    <Modal isOpen={isChatOpen} toggle={handleCloseChat}>
                        <ModalHeader toggle={handleCloseChat}>Messagerie</ModalHeader>
                        <ModalBody>
                            

                            <Input
                                type="text"
                                placeholder="Écrire un nouveau message"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
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
                    {applications.map((application) => (
  <Card className="mb-3">
    <CardBody style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ flex: "1 1 auto", marginRight: "1rem" }}>
        <CardTitle tag="h5" style={{fontWeight: "bold", marginBottom: "0.5rem"}}>{application.offer.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Entretien le {moment(application.interviewScheduled.date).format("DD/MM/YYYY")} à {moment(application.interviewScheduled.date).format("HH:mm")}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Localisation : {application.interviewScheduled.location}
        </CardSubtitle>
        <div style={{ marginTop: "1rem" }}>
          <Button color="primary" onClick={() => handleOpenChat(application.offer.company)}>
            <FaEnvelope className="mr-2" />
            Messagerie
          </Button>
        </div>
      </div>
      <div style={{ flex: "0 0 auto" }}>
        <QRCode size={128} value={`Entretien le ${moment(application.interviewScheduled.date).format("DD/MM/YYYY")} à ${moment(application.interviewScheduled.date).format("HH:mm")}. Localisation : ${application.interviewScheduled.location} - https://www.google.com/maps/place/${application.interviewScheduled.location}`} />
      </div>
    </CardBody>
  </Card>
))}










                </Container>
            </div>
            <DemoFooter />
        </>
    );
}

export default InterviewCondidat;
