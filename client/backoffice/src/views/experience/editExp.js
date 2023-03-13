import { API } from "../../config";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

function EditExp({ exp = { title: "", description: "", start: "", end: "" } }) 
{
    const [title, setTitle] = useState(exp.title);    
    const [description, setDescription] = useState(exp.description);    
    const [start, setStart] = useState(exp.start);    
    const [end, setEnd] = useState(exp.end);    



    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  console.log(id);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("start", start);
    formData.append("end", end);

   

    const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: name,
        
    };
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    const response = await fetch(`${API}/experience/updateE/${id}`, requestOptions);
      const data = await response.json();
      //   onUpdate(data.user);
console.log(data)
      history.push("/admin/dashboard");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };


  return (
    <>
      <div className="content">
        <Row>

          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Edit an Exerience</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>


                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>title</label>
                        <Input
                        placeholder="Name"
                        type="text"
                        value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                 
                 
                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                        placeholder="Description"
                        type="text"
                        value={description}
                          onChange={(event) => setDescription(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>StartDate</label>
                        <Input
                        placeholder="StartDate"
                        type="date"
                        value={start}
                          onChange={(event) => setStart(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>End Date</label>
                        <Input
                        placeholder="EndDate"
                        type="date"
                        value={end}
                          onChange={(event) => setEnd(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Exerience
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditExp;
