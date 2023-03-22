
import React, { useState } from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";


import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { useHistory } from "react-router-dom";

function NewPassEmail() {

    // Handle Login
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const history = useHistory();




    const handleSubmit = async (event) => {
        event.preventDefault();
        // validate the form fields
        let errors = {};
        if (email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // const { email, password } = user;
        try {
            const res = await fetch('http://127.0.0.1:3000/email/forgot-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                })
                ,credentials: 'include'
            });

            if (res.status === 400 || !res) {
                window.alert("Invalid Credentials")
            } else {
                window.alert("Mail sent Successfully");
                // registration successful
                // history.push('/new-password');
                const data = await res.json();
                localStorage.getItem("tokenfromemail")
                localStorage.setItem("tokenfromemail", data.tokenfromemail)
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

                                        <label>Email</label>
                                        <Input
                                            placeholder="Email@email.com"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        {errors.email && <span>{errors.email}</span>}
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

export default NewPassEmail;
