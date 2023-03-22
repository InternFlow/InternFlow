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
  Col, CardText, ListGroup,
  ListGroupItem,

} from "reactstrap";
function EditProfileUser({ user = { name: "", lastName: "", email: "", role: "condidat" } }) {
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const handleAddSkill = (event) => {
    event.preventDefault();
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user.role);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [schoolName, setSchoolName] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');

  const addEducation = () => {
    const newEducation = {
      schoolName: schoolName,
      degree: degree,
      fieldOfStudy: fieldOfStudy,
    };
    setEducations([...educations, newEducation]);
    setSchoolName("");
    setDegree("");
    setFieldOfStudy("");
  };

  const addExperience = () => {
    const newExperience = {
      jobTitle: jobTitle,
      company: company,
      description: description,
    };
    setExperiences([...experiences, newExperience]);
    setJobTitle("");
    setCompany("");
    setDescription("");
  };
  const addSkill = (e) => {
    e.preventDefault();
    setSkills([...skills, e.currentTarget.skill.value]);
    e.currentTarget.skill.value = "";
  };
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  //console.log(id);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name,
        lastName,
        email,
        password,
        role,
        educations,
        experiences,
        skills,
      };
      console.log(body);

      console.log(educations);
      console.log(experiences)
      console.log(skills)


      body.password = body.password === "" ? undefined : body.password;
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: 'include'
      };

      const response = await fetch(`${API}/Condidat/editprofile/${id}`, requestOptions);
      const data = await response.json();
      //   onUpdate(data.user);
      history.push("/admin/dashboard");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }

  };

  const handleEducationsChange = (index, e) => {
    const newEducations = [...educations];
    educations[index] = {
      ...newEducations[index],
      [e.target.name]: e.target.value,
    };
    setEducations(newEducations);
  };

  const handleExperiencesChange = (index, e) => {
    const newExperiences = [...experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [e.target.name]: e.target.value,
    };
    setExperiences(newExperiences);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Modifier le profil</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Nom</label>
                        <Input
                          placeholder="Nom"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Prénom</label>
                        <Input
                          placeholder="Prénom"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Adresse Email
                        </label>
                        <Input
                          placeholder="Email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                    <Col md="12">
                      <FormGroup>
                        <label>Formation</label>
                        {educations.map((education, index) => (
                          <div key={index}>
                            <Input
                              name="schoolName"
                              placeholder="Ecole/Université"
                              type="text"
                              value={education.schoolName}
                              onChange={(e) => handleEducationsChange(index, e)}
                            />
                            <Input
                              name="degree"
                              placeholder="Diplôme"
                              type="text"
                              value={education.degree}
                              onChange={(e) => handleEducationsChange(index, e)}
                            />
                            <Input
                              name="fieldOfStudy"
                              placeholder="Domaine d'étude"
                              type="text"
                              value={education.fieldOfStudy}
                              onChange={(e) => handleEducationsChange(index, e)}
                            />
                          </div>
                        ))}
                        <div>
                          <Input
                            name="schoolName"
                            placeholder="Ecole/Université"
                            type="text"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                          />
                          <Input
                            name="degree"
                            placeholder="Diplôme"
                            type="text"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                          />
                          <Input
                            name="fieldOfStudy"
                            placeholder="Domaine d'étude"
                            type="text"
                            value={fieldOfStudy}
                            onChange={(e) => setFieldOfStudy(e.target.value)}
                          />
                          <Button
                            className="btn-fill"
                            color="primary"
                            type="button"
                            onClick={addEducation}
                          >
                            Ajouter une formation
                          </Button>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">

                      <FormGroup>
                        <label>Expérience professionnelle</label>
                        {experiences.map((experience, index) => (
                          <div key={index}>
                            <Input
                              name="company"
                              placeholder="Entreprise"
                              type="text"
                              value={experience.company}
                              onChange={(e) => handleExperiencesChange(index, e)}
                            />
                            <Input
                              name="jobtitle"
                              placeholder="Poste"
                              type="text"
                              value={experience.jobTitle}
                              onChange={(e) => handleExperiencesChange(index, e)}
                            />
                            <Input
                              name="description"
                              placeholder="description"
                              type="text"
                              value={experience.description}
                              onChange={(e) => handleExperiencesChange(index, e)}
                            />
                          </div>
                        ))}
                        <div>
                          <Input
                            name="company"
                            placeholder="Entreprise"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                          <Input
                            name="jobtitle"
                            placeholder="Poste"
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                          />

                          <Input
                            name="description"
                            placeholder="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <Button
                            className="btn-fill"
                            color="primary"
                            type="button"
                            onClick={addExperience}
                          >
                            Ajouter une expérience professionnelle
                          </Button>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>



                  <Row>
                    <Col md="12">
                      <h1>Compétences</h1>
                      <ListGroup>
                        {skills.map((skill, index) => (
                          <ListGroupItem key={index}>{skill}</ListGroupItem>
                        ))}
                      </ListGroup>
                      <Form >
                        <FormGroup>
                          <Input
                            type="text"
                            name="skill"
                            placeholder="Ajouter une compétence"
                            value={newSkill}
                            onChange={(event) => setNewSkill(event.target.value)}
                          />
                        </FormGroup>
                        <Button color="primary" onClick={handleAddSkill}>Ajouter</Button>
                      </Form>
                    </Col>
                  </Row>




                  <Button className="btn-fill" color="primary" type="submit">
                    Enregistrer
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">

                  <a href="#pablo" onClick={(e) => e.preventDefault()}>

                    <h5 className="title">{name} {lastName}</h5>
                  </a>
                  <p className="description">{email}</p>
                </div>
                <div className="card-description">
                  {educations.length > 0 && (
                    <div>
                      <h5>Formations</h5>
                      <ul>
                        {educations.map((education, index) => (
                          <li key={index}>
                            <p>{education.degree}</p>
                            <p>{education.schoolName}</p>
                            <p>{education.fieldOfStudy}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {experiences.length > 0 && (
                    <div>
                      <h5>Expériences</h5>
                      <ul>
                        {experiences.map((experience, index) => (
                          <li key={index}>
                            <p>{experience.position}</p>
                            <p>{experience.company}</p>
                            <p>{experience.description}</p>

                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {skills.length > 0 && (
                    <div>
                      <h5>Expériences</h5>
                      <ul>
                        {experiences.map((sk, index) => (
                          <li key={index}>
                            <p>sk</p>

                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default EditProfileUser;
