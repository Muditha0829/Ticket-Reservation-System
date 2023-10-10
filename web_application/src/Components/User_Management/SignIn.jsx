import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IsValidNIC, IsValidPassword} from '../Validations'

const SignIn = () => {
  const { setUser, UserType } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    NIC: '',
    Password: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!IsValidNIC(formData.NIC)) {
      toast.error('Invalid NIC format.');
      return;
    }

    if (!IsValidPassword(formData.Password)) {
      toast.error('Invalid Password format.');
      return;
    }

    axios.post('http://localhost:57549/api/users/signin', formData)
      .then(response => {
        console.log('User authenticated:', response.data);
        setUser(response.data.UserID, response.data.UserType);
        sessionStorage.setItem('userID', response.data.userID);

        if (response.data.UserType === 'backofficeuser') {
          history.push('/backofficeuserdashboard');
          window.location.href="/backofficeuserdashboard";
        } else if (response.data.UserType === 'travelagent') {
          history.push('/travelagentdashboard');
          window.location.href="/travelagentdashboard";
        } else {
          history.push('/home');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          toast.error('Password or NIC mismatch. Please try again.');
        } else if (error.response && error.response.status === 400) {
          toast.error('Invalid User credentials. Please check your inputs.');
        } else {
          console.error('Error authenticating user:', error);
          toast.error('Invalid User credentials. Please check your inputs.');
        }
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ padding: '25px', width: "1200px", textAlign: "center", background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
        <Row>
        <Col>
        <img src='https://lp-cms-production.imgix.net/2022-02/shutterstockRF_376030297.jpg?auto=format&q=75&w=1920' style={{width: "87%"}}/>
        </Col>
          <Col>
        <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
        <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Sign In</Card.Title>
        <Form onSubmit={handleSubmit} style={{textAlign: "left"}}>
          <Form.Group controlId="NIC" style={{ marginBottom: "25px", fontFamily: "Montserrat" }}>
          <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>NIC</Form.Label>
            <Form.Control
              type="text"
              name="NIC"
              value={formData.NIC}
              onChange={handleChange}
              placeholder='NIC'
              required
            />
          </Form.Group>
          <Form.Group controlId="Password" style={{ marginBottom: "25px", fontFamily: "Montserrat" }}>
          <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder='Password'
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ padding: '10px 20px', backgroundColor: '#00284d', fontFamily: "Montserrat" }}>
            Sign In
          </Button>
        </Form>
        <p style={{ marginTop: "15px", fontSize: "1.2em", color: "#555", fontFamily: "Montserrat" }}>
          Don't have an account? <Link to="/signup" style={{ color: "#00284d", textDecoration: "none", fontWeight: "bold", fontFamily: "Montserrat" }}>Sign Up</Link>
        </p>
        </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default SignIn;