import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Col, Input, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from 'reactstrap';

export default function TrainerList(props) {
  
  const { onTrainerSelect} = props;
    const [trainerList,settrainerList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    const fetchTrainerList = async () => {
        try {
          const response = await fetch(`http://localhost:5000/Admin/allU`, {
            method: 'GET',
            credentials: 'include',
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
      
          const data = await response.json();
          settrainerList(data);
        } catch (err) {
          console.error(err);
        }
      };
      const filteredtrainerList = trainerList.filter((trainer) => {
        const name = trainer.name?.toLowerCase();
        const email = trainer.email?.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
    
        return (
          name?.includes(searchTermLower) ||
          email?.includes(searchTermLower) 
        );
      });

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
      
    useEffect(()=>{
      fetchTrainerList();
    },[])

  const filteredTrainerList = trainerList.filter((t)=>{
    return t.role=== "formateur"
  })


  return (
    <div>
        <ListGroup>
            {filteredTrainerList &&(<><ListGroupItemHeading>
                <Input type='search' onChange={handleSearchChange} value={searchTerm}
                placeholder='Search'/>
            </ListGroupItemHeading>
        {(filteredTrainerList.length === 0) ? (<p>No trainers registered yet</p>):(<>{filteredtrainerList.map((trainer)=>(
            <ListGroupItem onClick={()=>onTrainerSelect(trainer)} style={{cursor:"pointer"
      }}>
        <Row>
             
                  <Col md="4">

            <img src={trainer.pfpPath} alt="image" 
            style={{float:"left",width:"30px",height:"30px",borderRadius:"50%"}} /> 
            </Col>
            <Col md="8">
            <b style={{
                 overflowWrap: "break-word",
                  }}>
                {trainer.name &&(<>{trainer.name}</>)}
                </b>
                <p style={{
                 overflowWrap: "break-word",
                  }}>
                {trainer.email &&(<>{trainer.email}</>)}
                </p>
                
                </Col>
                </Row>
            </ListGroupItem>
        ))}</>
        )}
         </>)}
        </ListGroup>
    </div>
  )
}
