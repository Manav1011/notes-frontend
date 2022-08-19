import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const LoginForm = ({ darkMode }) => {  
  const [token,setToken]=useState(localStorage.getItem('Token'))
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    if (token){
     navigate("/")
    }
},[])
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    $(".sendingAlert").removeClass("d-none");
    fetch("https://personalnotes-backend.herokuapp.com/accounts/", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        email: email.toLowerCase(),
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json;",
      },
    })
      // Converting to JSON
      .then((response) => response.json())

      // Displaying results to console
      .then(() => {
        $(".email").addClass("d-none");
        $(".sendingAlert").addClass("d-none");
        $(".sentAlert").removeClass("d-none");
        $(".otp").removeClass("d-none");
      })
      .catch((err) => console.log(err));
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();

    fetch("https://personalnotes-backend.herokuapp.com/accounts/", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        otp: otp,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json;",
      },
    })
      // Converting to JSON
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => {
        if (json.token) {
          localStorage.setItem("Token", json.token);
          $('.navigation').removeClass('d-none')
          navigate("/")
        } else {
          $(".sentAlert").addClass("d-none");
          $(".invalidotp").removeClass("d-none");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className={`container card  border shadow-lg rounded bg-gradient ${darkMode ? "bg-dark" : "bg-light"}`}
      style={{ marginTop: "30vh" }}
    >
      <Card>
        <Card.Body
          className={`bg-gradient ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
        >
          <Card.Title>Login Form</Card.Title>
          <Form onSubmit={handleEmailSubmit} className="email">
            <div className="sendingAlert d-none">
              {["warning"].map((variant) => (
                <Alert key={variant} variant={variant}>
                  Sending OTP!!
                </Alert>
              ))}
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                id="emailval"
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Form onSubmit={handleOtpSubmit} className="otp d-none">
            <div className="sentAlert d-none">
              {["success"].map((variant) => (
                <Alert key={variant} variant={variant}>
                  OTP Sent!!
                </Alert>
              ))}
            </div>
            <div className="invalidotp d-none">
              {["danger"].map((variant) => (
                <Alert key={variant} variant={variant}>
                  Invalid OTP!!
                </Alert>
              ))}
            </div>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                required
                id="otpval"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
