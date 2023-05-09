import React from "react";
import {
  Card, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  CardText, 
  Button,
  Col,
  CardFooter
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

function MyCourseListItem(props) {
  const { name, description, price, image } = props.course;
  const { searchTerm , onEdit, onDelete} = props;
  const history = useHistory();
  // function to replace search term with highlighted text
  const highlightSearchTerm = (text) => {
    if (searchTerm && searchTerm.length > 0) {
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return text.split(regex).map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      );
    } else {
      return text;
    }
  };

  const handleManageClasses = () => {
    history.push(`/Classes/${props.course._id}`);
  };

  return (
    <Col col="4">
    <Card className="mb-1 h-100"   style={{ marginBottom: "180px", alignItems: "center",  margin: "20px" }}>
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody> 
        <CardTitle tag="h5" onClick={()=>{props.onCourseNameClick()}} style={{cursor:"pointer"}}>{highlightSearchTerm(name)}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Price: ${price}
        </CardSubtitle>
        <CardText>{highlightSearchTerm(description)}</CardText>
        <CardFooter>
        <Button color="primary" style={{ margin: '18px' }} onClick={()=>onEdit(props.course)}>Edit</Button>
        <Button color="danger" style={{ margin: '18px' }} onClick={()=>onDelete(props.course)}>Delete</Button>
        
      <Button color="info" style={{ margin: '18px' }} onClick={handleManageClasses} >Manage</Button>
      </CardFooter>
      </CardBody>
    </Card>
  </Col>
  );
}

export default MyCourseListItem;
