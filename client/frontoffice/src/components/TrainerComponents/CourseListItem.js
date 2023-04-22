import React from "react";
import {
  Card, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  CardText, 
  Button,
  Col
} from 'reactstrap';

function CourseListItem(props) {
  const { name, description, price, image } = props.course;
  const { searchTerm } = props;

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

  return (
    <Col col="3">
    <Card color="warning" style={{ width: '18rem' }}>
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{highlightSearchTerm(name)}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Price: ${price}
        </CardSubtitle>
        <CardText>{highlightSearchTerm(description)}</CardText>
        <Button>Enroll</Button>
      </CardBody>
    </Card>
  </Col>
  );
}

export default CourseListItem;
