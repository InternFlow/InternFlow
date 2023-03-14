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

function EditSkill({ skill = { name: "" } }) 
{
    const [name, setName] = useState(skill.name);    
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  console.log(id);

    const formData = new FormData();

    formData.append("name", name);
   

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
    const response = await fetch(`${API}/skills/updateS/${id}`, requestOptions);
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
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Edit a  Skill</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>


                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                        placeholder="Name"
                        type="text"
                        value={name}
                          onChange={(event) => setName(event.target.value)}
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
                        Update Skill
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

export default EditSkill;
