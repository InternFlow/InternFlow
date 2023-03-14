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

function EditUser({ user = { name: "", lastName: "", email: "", role: "condidat" } }) {
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(user.role);
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  console.log(id);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);


    const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        role: role
    };
    body.password = body.password === "" ? undefined : body.password;
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    const response = await fetch(`${API}/Admin/users/${id}`, requestOptions);
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
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Edit a  User</CardTitle>
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
                    <Col md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          placeholder="Email"
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Role</label>
                        <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="formateur">Trainer</option>
                            <option value="company">Company</option>
                            <option value="condidat">Intern</option>
                        </select>
                        {/* <Input
                          placeholder="Role"
                          type="text"
                          value={formData.role}
                          onChange= {(e)=> setFormData({ ...formData, role: e.target.value})}
                        /> */}
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
                        Update User
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

export default EditUser;
