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

function CreateUsers() {
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    pfpPath: null
  });


  const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await fetch(`${API}/Admin/addU`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(formData)

      });

      history.push("/admin/dashboard");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }


  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //     formData.append('name', name);
  //     formData.append('lastName', lastName);
  //     formData.append('email', email);
  //     formData.append('password', password);
  //     formData.append('role', role);

  //   try {


  //     const response = await fetch(${API}/Admin/AddUserList, {
  //       method: 'POST',
  //       body: formData
  //     });

  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }

  //     const data = await response.json();
  //     console.log(data);

  //     // do something with the response data, e.g. redirect to another page
  //     history.push('/admin/dashboard');

  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
  // }

  return (
    <>
      <div className="content">
        <Row>

          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5" style={{fontWeight: "bold" }}>Add a new User</CardTitle>
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
                        value={formData.name}
                        onChange= {(e)=> setFormData({ ...formData, name: e.target.value})}
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
                          value={formData.lastName}
                          onChange= {(e)=> setFormData({ ...formData, lastName: e.target.value})}

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
                          value={formData.email}
                          onChange= {(e)=> setFormData({ ...formData, email: e.target.value})}

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
                          value={formData.password}
                          onChange= {(e)=> setFormData({ ...formData, password: e.target.value})}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Role</label>
                        <Input
                          placeholder="Role"
                          type="text"
                          value={formData.role}
                          onChange= {(e)=> setFormData({ ...formData, role: e.target.value})}

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
                        Create User
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

export default CreateUsers;

// import { API } from "../../config";
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col
// } from "reactstrap";

// function CreateUsers() {
//   const [formData, setFormData] = useState({
//     name: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: "",
//     // pfpPath: null,
//     // pfpFile: null // nouvel état pour stocker le fichier image
//   });

//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       form.append("lastName", formData.lastName);
//       form.append("email", formData.email);
//       form.append("password", formData.password);
//       form.append("role", formData.role);
//       // form.append("pfpPath", formData.pfpPath); // ajouter le fichier image à la requête

//       await fetch(`${API}/Admin/addU`, {
//         method: "POST",
//         credentials: 'include',
//         body: form
//       });

//       history.push("/admin/dashboard");
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//     }
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       pfpPath: e.target.files[0] // mettre à jour l'état avec le fichier sélectionné
//     });
//   };

//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="8">
//             <Card className="card-user">
//               <CardHeader>
//                 <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
//                   Add a new User
//                 </CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Form onSubmit={handleSubmit}>
//                   <Row>
//                     <Col md="6">
//                       <FormGroup>
//                         <label>Name</label>
//                         <Input
//                           placeholder="Name"
//                           type="text"
//                           value={formData.name}
//                           onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                           }
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   {/* ... */}

//                   <Row>
//                     <Col md="6">
//                       <FormGroup>
//                         <label>lastName</label>
//                         <Input
//                           placeholder="LastName"
//                           type="text"
//                           value={formData.lastName}
//                           onChange={(e) =>
//                             setFormData({ ...formData, lastName: e.target.value })
//                           }
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md="6">
//                       <FormGroup>
//                         <label>Email</label>
//                         <Input
//                           placeholder="Email"
//                           type="email"
//                           value={formData.email}
//                           onChange={(e) =>
//                             setFormData({ ...formData, email: e.target.value })
//                           }
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md="6">
//                       <FormGroup>
//                         <label>Password</label>
//                         <Input
//                           placeholder="Password"
//                           type="password"
//                           value={formData.password}
//                           onChange={(e) =>
//                             setFormData({ ...formData, password: e.target.value })
//                           }
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md="6">
//                       <FormGroup>
//                         <label>Role</label>
//                         <Input
//                           placeholder="Role"
//                           type="text"
//                           value={formData.role}
//                           onChange={(e) =>
//                             setFormData({ ...formData, role: e.target.value })
//                           }
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>

//                   {/* ajouter un input de type file pour l'image */}
//                   <Row>
//                     <Col md="6">
//                       <FormGroup>
//                         <label>Profile Picture</label>
//                         <Input
//                           type="file"
//                           onChange={handleImageChange}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <div className="update ml-auto mr-auto">
//                       <Button className="btn-round" color="primary" type="submit">
//                         Create User
//                       </Button>
//                     </div>
//                   </Row>
//                 </Form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default CreateUsers;

