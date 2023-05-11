import React, { useEffect } from "react";
import { useState } from "react";
import { validateEmail, validateFullName, validateMessage } from "./Validation";
import InlineError from "./InlineError";
import axios from "axios";
import Swal from "sweetalert2";

// reactstrap components
import {
  Button,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
function Contactus() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fullNameError, setFullNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [messageError, setMessageError] = useState();
  const [send, setSend] = useState();

  useEffect(() => {
    validateFullName({ fullName, setFullNameError });
    validateEmail({ email, setEmailError });
    validateMessage({ message, setMessageError });
    // ***********
    if (send) {
      Swal.fire("Thank your for your feedback", send.msg, "success");
      setFullName("");
      setEmail("");
      setMessage("");
      setSend();
    }
  }, [fullName, email, message, send]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!fullNameError & !emailError & !messageError) {
      try {
        const datas = { fullName, email, message };
        let res = await axios.post(`http://localhost:5000/send`, datas);
        if (res) {
          setSend(res.data);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div id="contactUs">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="text-center">Contact Us?</h2>
            <Form onSubmit={submitHandler} className="contact-form">
              <Row>
                <Col md="6">
                  <label>Name</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </InputGroup>
                  {fullNameError && <InlineError error={fullNameError} />}
                </Col>
                <Col md="6">
                  <label>Email</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  {emailError && <InlineError error={emailError} />}
                </Col>
              </Row>
              <label>Message</label>
              <Input
                placeholder="Give us your feedback"
                type="textarea"
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {messageError && <InlineError error={messageError} />}
              <Row>
                <Col className="ml-auto mr-auto">
                  <Button
                    type="submit"
                    className="btn-fill"
                    color="danger"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Contactus;