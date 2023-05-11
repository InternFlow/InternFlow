import React, { useEffect, useState } from 'react'
import { CardHeader } from 'reactstrap';
import { Card, CardGroup, Col, ListGroup, ListGroupItem, Row, Button} from 'reactstrap';
import { BsLink } from 'react-icons/bs';
import axios from 'axios';
export default function Class(props) {
    const classItem = props.class;
    const DateStr = new Date(classItem.startDateTime)
    .toLocaleString('en-US', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' })
    .replace(',', ' -');
    
    const [meetingExists, setMeetingExists] = useState(false);


    useEffect(()=>{
      axios
      .get(`http://localhost:5000/video-call/get/${classItem._id}`)
      .then((res) => {
        if (res.status === 200) setMeetingExists(true);
       
        else setMeetingExists(false);
      });

    },[])

  return (
    <div>
        <ListGroup style={{margin:"30px"}}>
            <ListGroupItem style={{padding:"20px"}}>
                 <h3 style={{color: 'blue'}}>{classItem.name}</h3>
                <p>{DateStr}</p>
            </ListGroupItem>
            <ListGroupItem style={{padding:"30px"}}>
                <h5>Duration: {classItem.duration}</h5>
                <p>{classItem.description}</p>
                <Col>
                <CardGroup>
                <Row>
                {
                  classItem.material.map((mat)=>(
                    <Col col="3" style={{margin:"20px"}}>
                      <a href={mat.url} target="_blank">
                    <Card className='card card-link' style={{cursor:"pointer"}}>
                      <CardHeader style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ flexGrow: 1 , color:"black"}}>{mat.name}</p>
                        <BsLink style={{ flexShrink: 0, flexBasis: 'auto', marginLeft: 'auto' }} />
                      </CardHeader>
                      
                    </Card>
                    </a>
                    </Col>
                  ))
                }
                </Row>
                </CardGroup>
                </Col>
               
                {meetingExists &&
                (
                  <Col><Button onClick={()=>{
                  window.open('http://localhost:3000/VideoCallG/'+classItem._id, '_blank'); 
                }
                }>
                 Join Online Class
                </Button></Col>)
}


            </ListGroupItem>
        </ListGroup>
    </div>
  )
}
