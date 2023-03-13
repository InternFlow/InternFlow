/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { API } from "../../config";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

function CreateExperience() {
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });


  const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await fetch(`${API}/experience/addE`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({ name,email, password })
      body: JSON.stringify(formData)

      });

      //const { token } = await response.json();
      //localStorage.setItem("token", token);
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
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Add a new Exerience</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>


                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                        placeholder="Title"
                        type="text"
                        value={formData.title}
                        onChange= {(e)=> setFormData({ ...formData, title: e.target.value})}
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
                        value={formData.description}
                        onChange= {(e)=> setFormData({ ...formData, description: e.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>Start Date</label>
                        <Input
                        placeholder="Start Date"
                        type="date"
                        value={formData.start}
                        onChange= {(e)=> setFormData({ ...formData, start: e.target.value})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col  md="6">
                      <FormGroup>
                        <label>End Date</label>
                        <Input
                        placeholder="End Date"
                        type="date"
                        value={formData.end}
                        onChange= {(e)=> setFormData({ ...formData, end: e.target.value})}
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
                        Create Skill
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

export default CreateExperience;
