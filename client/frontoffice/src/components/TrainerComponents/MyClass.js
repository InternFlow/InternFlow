import React from 'react'
import { CardHeader, Modal , Button, ModalBody, CardBody} from 'reactstrap';
import { Card, CardGroup, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { BsPlusCircle, BsPencilSquare, BsXSquare } from 'react-icons/bs';
import { useState } from 'react';
import VideoCallOwner from 'views/examples/VideoCallOwner';
import { useEffect } from 'react';
import axios from 'axios';
export default function MyClass(props) {
    const { onDeleteClass, onEditClass ,onEditMaterial , onDeleteMaterial ,onAddMaterial} = props;
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
        <ListGroup style={{margin:"30px",padding:"20px"}}>
            <ListGroupItem style={{padding:"20px"}}>
              <Row>
            <Col md="11">
                 <h3 style={{color: 'blue'}}>{classItem.name}</h3>
                <p>{DateStr}</p>
                </Col>
                <Col md="1">
                    <Row style={{margin:'9px'}}>
                        <BsPencilSquare style={{ cursor:"pointer",fontSize:"22"}}
                        onClick={() => onEditClass(classItem)}
                        title='Edit'/>
                    </Row>
                    <Row style={{margin:'9px'}}>
                        <BsXSquare style={{ cursor:"pointer",fontSize:"22"}}
                        onClick={() => onDeleteClass(classItem)}
                        title='Delete'
                        />

                    </Row>
                        
                        
                    </Col>
                </Row>
            </ListGroupItem>
            <ListGroupItem style={{padding:"30px"}}>
                <Row>
                   
                         <h5>Duration: {classItem.duration}</h5>
                  </Row>
                  <Row>
                         <p>{classItem.description}</p>
                   
                
                </Row>
                <Col>
                <CardGroup>
                <Row>
                {
                  classItem.material.map((mat)=>(
                    <Col col="3" style={{margin:"20px"}}>
                        
                    <Card className='card card-link' style={{cursor:"pointer", maxWidth:"300px"}} >
                   
                      <CardHeader style={{ display: 'flex', alignItems: 'center',  }}>
                        <Col md="8">
                     <div title={mat.name} style={{overflow: 'hidden',}}> 
                     <p style={{ flexGrow: 1,  color: "black",whiteSpace: 'pre-wrap',wordWrap: 'break-word',}} >
                      {mat.name.length > 30 ? `${mat.name.slice(0, 30)}...` : mat.name}
                      </p>
                      </div>
                      </Col>
                        <Col style={{margin:'9px',}} md="1">
                        <BsPencilSquare style={{ cursor:"pointer",fontSize:"22", color: "black"}}
                        onClick={() => onEditMaterial(mat,classItem._id)}
                        title='Edit'/>
                    </Col>
                    <Col style={{margin:'9px'}} md="1">
                        <BsXSquare style={{ cursor:"pointer",fontSize:"22", color: "black"}}
                        onClick={() => onDeleteMaterial(mat,classItem._id)}
                        title='Delete'/>
                    </Col>
                      </CardHeader>
                      
                    </Card>
                    
                    </Col>
                  ))
                }
               
                
                <BsPlusCircle color="gray" onClick={()=>onAddMaterial(classItem._id)} 
                   style={{ cursor:"pointer",fontSize:"40",marginTop:'30px'}}/>
                  
                   
                </Row>
                </CardGroup>

              </Col>
              <Col style={{marginTop:"18px",marginLeft:"20px"}}>
                <Button onClick={()=>{
                  window.open('http://localhost:3000/VideoCallC/'+classItem._id, '_blank'); 
                }
                }>
                  {meetingExists ? (<>Start Online Class</>) : (<>Rejoin Online Class</>)}
                </Button>
              </Col>
            </ListGroupItem>
        </ListGroup>


 
       
    </div>
  )
}
