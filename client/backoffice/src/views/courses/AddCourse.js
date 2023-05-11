import React, { useState } from "react";
import TrainerList from "./TrainerList";
import { Card, Col, Row } from "reactstrap";
import AddCourseForm from "./AddCourseForm";

export default function AddCourse() {
  const [trainer, setTrainer] = useState(null);

  return (
      <div className="content">
 
      <Row>
        <Col md="4">
        <Card className='card no-transition' style={{minHeight:"500px", padding:"10%"}}>
        <TrainerList onTrainerSelect={(t)=>{setTrainer(t)}}/>
        </Card>
        </Col >
        <Col md="8">

          {trainer &&(  <AddCourseForm trainer={trainer} onCourseAdded={()=>{
              console.log("course added")
            }}/>)}
        

        </Col>
      </Row>
    </div>
  );
}
