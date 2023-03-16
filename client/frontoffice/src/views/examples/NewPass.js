
import React, { useState } from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";


import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { useHistory } from "react-router-dom";

function NewPass() {

    // Handle Login
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const history = useHistory();




    const handleSubmit = async (event) => {
        event.preventDefault();
        // validate the form fields
        let errors = {};
        if (password.trim() === '') {
            errors.password = 'Password is required';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const token = localStorage.getItem("tokenfromemail");
        console.log(token);


        // const { email, password } = user;
        try {
            const res = await fetch(`http://127.0.0.1:3000/email/reset-password/${token}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password
                })
            });

            if (res.status === 200 || !res) {
                window.alert("Reset Successfull");
                // registration successful
                 history.push('/sign-in');
                const data = await res.json();
                console.log(data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ExamplesNavbar />
            <div
                className="page-header"
                style={{
                    backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
                }}
            >
                <div className="filter" />
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" lg="4">
                            <Card className="card-register ml-auto mr-auto">


                                {/* form */}
                                <Form onSubmit={handleSubmit} className="register-form">
                                    <div>

                                        <label>New Password</label>
                                        <Input
                                            placeholder="********"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        {errors.password && <span>{errors.password}</span>}
                                    </div>
                                    
                                    <Button block className="btn-round" color="danger" type="submit" onClick={{ handleSubmit }}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <div className="footer register-footer text-center">
                    <h6>
                        © {new Date().getFullYear()}, made with{" "}
                        <i className="fa fa-heart heart" /> by Creative Tim
                    </h6>
                </div>
            </div>
        </>
    );
}

export default NewPass;
