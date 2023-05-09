
import React, { useState } from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, Alert } from "reactstrap";

// core components
import ResgisterNavBar from "components/Navbars/RegisterNavbar";
import { useHistory } from "react-router-dom";

function Login() {

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmerr, setConfirmerr] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const history = useHistory();



  const gotolinkedIn = async (event) => {

    //history.push('/Edit-condidat-page');

    history.push(`/linkedIn`);


}


  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate the form fields
    let errors = {};

    if (!password) {
      errors.password = 'Password is required';
      setAlertMessage(' Please Fill in with your password! ');
      setShowAlert(true); 
    } 
    else {
      // Vérifier que le mot de passe contient au moins 8 caractères et au moins un chiffre et une lettre
      if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        errors.password =
          "Password should contain at least 8 characters with at least one letter and one number";
          setAlertMessage(' Please Fill in with a valid password! ');
          setShowAlert(true); 
      }
    }

    if (!email) {
      errors.email = 'Email is required';
      setAlertMessage(' Please Fill in with your email! ');
      setShowAlert(true); 

    } else {
      // Vérifier que l'adresse email est valide
      if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Invalid email address";
        setAlertMessage(' your email is lacking ! ');
        setShowAlert(true); 
      }
    }


    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // const { email, password } = user;
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    //  console.log(res);

      if (res.status === 200) {
        const { token, user } = await res.json();
        localStorage.setItem("token", token);
        document.cookie = `jwt=${token}; max-age=86400*100; path=/`;
        localStorage.setItem("id", user._id);
        localStorage.setItem('profile', JSON.stringify(user));
        console.log(user._id);

        localStorage.setItem("role", user.role);
        if (user.role !== "admin") {
          history.push("/Profile");
        } else {
          console.log("aaaaaaaaaaaa")

          document.getElementById("admin-redirect").setAttribute("href","http://localhost:3001/admin/get-sesstion?token=" + token);
          document.getElementById("admin-redirect").click();
        }
      } else if (res.status === 400) {
        const data = await res.json();
       // console.log(data.errors);

        setConfirmerr(data.errors.expiration);
        console.log(confirmerr);
      }
    } catch (error) {
console.log(error);
    }
  };

  return (
    <>
      <ResgisterNavBar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login1.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">SignIn</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon"
                    color="linkedin"
                    href="#pablo"
                    onClick={gotolinkedIn}
                  >
                    <i className="fa fa-linkedin" />
                  </Button>
                </div>

                {/* form */}
                <Form onSubmit={handleSubmit} className="register-form">
                  <div>
                    <label>Email</label>
                    <Input
                      placeholder="Email"
                      // hedhy badelt'ha type te3ha mail
                      type="email"
                      // {...register("email", {
                      //   required: true,
                      //   pattern: /^\S+@\S+$/i,
                      // })}
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    //  onChange={handleChange}
                    />
                    {errors.email && <span>{errors.email}</span>}
                  </div>
                  <div>
                    <label>Password</label>

                    <Input
                      placeholder="Password"
                      type="password"
                      // {...register("password", { required: true })}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}

                    //  onChange={handleChange}
                    />
                    {errors.password && <span>{errors.password}</span>}
                  </div>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="submit"
                  >
                    Login
                  </Button>
                  {showAlert && (
                    <Alert color="success">{alertMessage}</Alert>
                  )}
                </Form>

                {confirmerr && <span>{confirmerr}</span>}



                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    // onClick={(e) => e.preventDefault()}
                    onClick={() => history.push("/new-passwordEmail")}
                  >
                    Forgot password?
                  </Button>

                  <a    href=""  id="admin-redirect"  style={{ display: "none" }} ></a>
                </div>
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

export default Login;
